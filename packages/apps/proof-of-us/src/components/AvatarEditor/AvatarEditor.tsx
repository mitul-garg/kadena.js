import { IconButton } from '@/components/IconButton/IconButton';
import { TitleHeader } from '@/components/TitleHeader/TitleHeader';
import { useAvatar } from '@/hooks/avatar';
import { useProofOfUs } from '@/hooks/proofOfUs';
import { isAlreadySigning } from '@/utils/isAlreadySigning';
import { MonoClose } from '@kadena/react-icons';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';
import type { FC, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  cameraButton,
  cameraClass,
  cameraWrapperClass,
  canvasClass,
  headerClass,
  hiddenClass,
  wrapperClass,
} from './styles.css';

interface IProps {
  next: () => void;
}

export const AvatarEditor: FC<IProps> = ({ next }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const { addBackground } = useAvatar();
  const { proofOfUs, updateProofOfUs, updateBackgroundColor, closeToken } =
    useProofOfUs();
  const router = useRouter();

  useEffect(() => {
    // if someone is already signing the pou, you are not allowed to change the photo anymore
    if (isAlreadySigning(proofOfUs?.signees)) {
      next();
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!videoRef.current || !isMounted) return;

    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        if (!videoRef.current) return;
        if (!canvasRef.current) return;

        videoRef.current.srcObject = stream;
        const containerWidth = (videoRef.current.parentNode as HTMLElement)
          ?.offsetWidth;
        const containerHeight = (videoRef.current.parentNode as HTMLElement)
          ?.offsetHeight;

        canvasRef.current.width = containerWidth * 0.9;
        canvasRef.current.height = containerWidth * 0.9;
        const topIndent = 100;
        const context = canvasRef.current.getContext('2d');

        function updateCanvas() {
          if (!videoRef.current) return;
          if (!canvasRef.current) return;

          const newWidth =
            (videoRef.current.videoWidth * containerHeight) /
            videoRef.current.videoHeight;

          context?.drawImage(
            videoRef.current,
            canvasRef.current.width / 2 - newWidth / 2,
            -topIndent,
            newWidth,
            containerHeight,
          );

          window.requestAnimationFrame(updateCanvas);
        }

        requestAnimationFrame(updateCanvas);
      })
      .catch((e) => {
        alert('The browser needs permissions for the camera to work');
      });
  }, [isMounted]);

  const handleCapture = async (evt: MouseEvent<HTMLButtonElement>) => {
    if (isAlreadySigning(proofOfUs?.signees)) return;
    evt.preventDefault();

    if (!videoRef.current) return;
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');

    // get color
    const color = `rgba(${context?.getImageData(0, 0, 1, 1).data.join(',')})`;

    if (!proofOfUs) return;

    await addBackground(proofOfUs, { bg: canvasRef.current.toDataURL() });
    await updateProofOfUs({
      backgroundColor: updateBackgroundColor(color),
    });

    (videoRef.current?.srcObject as MediaStream)
      ?.getTracks()
      .forEach((t) => t.stop());

    next();
  };

  const handleClose = async () => {
    if (!confirm('Are you sure you want to stop with this token?')) return;
    await closeToken({ proofOfUsId: proofOfUs.proofOfUsId });
    setIsMounted(false);
    router.replace('/user');
  };

  return (
    <section className={wrapperClass}>
      <div className={headerClass}>
        <TitleHeader
          label="Say Cheese"
          Append={() => (
            <>
              <IconButton onClick={handleClose}>
                <MonoClose />
              </IconButton>
            </>
          )}
        />
      </div>
      {!isMounted && <div>loading</div>}
      <div
        className={classnames(
          cameraWrapperClass,
          !isMounted ? hiddenClass : '',
        )}
      >
        <canvas
          ref={canvasRef}
          className={classnames(canvasClass, !isMounted ? hiddenClass : '')}
        ></canvas>
        <video
          className={classnames(cameraClass, !isMounted ? hiddenClass : '')}
          ref={videoRef}
          id="player"
          controls={false}
          autoPlay
          muted
          playsInline
        ></video>
        {!isAlreadySigning(proofOfUs?.signees) && (
          <button
            className={cameraButton}
            id="capture"
            onClick={handleCapture}
          />
        )}
      </div>
    </section>
  );
};
