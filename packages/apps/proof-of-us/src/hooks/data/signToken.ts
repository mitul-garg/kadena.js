import { useProofOfUs } from '@/hooks/proofOfUs';
import { wait } from '@/utils/wait';
import { useState } from 'react';

export const useSignToken = () => {
  const { addSignee, updateSigneeStatus, proofOfUs } = useProofOfUs();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data] = useState<IProofOfUs | undefined>(undefined);

  const signToken = async () => {
    if (!proofOfUs) return;
    setIsLoading(true);
    setHasError(false);
    updateSigneeStatus('signing');
    addSignee();

    //@TODO actual signing to wallet
    await wait(5000);

    updateSigneeStatus('success');

    //TODO: only close when there is success
    //closeToken({ proofOfUsId: proofOfUs?.proofOfUsId });

    setIsLoading(false);
    setHasError(false);
  };

  return { isLoading, hasError, data, signToken };
};