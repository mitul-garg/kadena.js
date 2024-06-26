import type { StreamMetaData } from '@7-docs/edge';
import { useRouter } from 'next/router';
import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { IConversation } from './useConversation';
import { useConversation } from './useConversation';
import { useStream } from './useStream';

interface IProps {
  metadata?: StreamMetaData[];
  //eslint-disable-next-line @rushstack/no-new-null
  searchInputRef: MutableRefObject<HTMLInputElement | null>;
  handleSubmit: (value: string) => Promise<void>;
  outputStream: string;
  conversation: IConversation;
  error: string | undefined;
  isLoading: boolean;
}

export const useSearch = (limitResults: number = 50): IProps => {
  const [query, setQuery] = useState<string | undefined>();
  const [conversation, dispatch] = useConversation();
  const [
    startStream,
    isStreaming,
    outputStream,
    streamMetaData,
    error,
    isLoading,
  ] = useStream();
  const router = useRouter();

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const startSearch = useCallback(
    async (value: string): Promise<void> => {
      if (value === null) return;
      dispatch({ type: 'setInput', value });
    },
    [dispatch],
  );

  const updateQuery = useCallback(
    (value: string): void => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      startSearch(value);
    },
    [startSearch],
  );

  useEffect(() => {
    if (outputStream.length > 0 && !isStreaming) {
      dispatch({
        type: 'commit',
        value: outputStream,
        metadata: streamMetaData,
      });
    }
  }, [isStreaming, outputStream, dispatch, streamMetaData]);

  useEffect(() => {
    if (conversation.input.length > 0) {
      startStream(conversation.input, conversation);
    }
  }, [conversation.input, conversation, startStream]);

  const handleSubmit = useCallback(
    async (value: string): Promise<void> => {
      if (value === undefined || query === value) return;
      dispatch({ type: 'reset' });
      setQuery(value);
      await updateQuery(value);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(`${router.route}?q=${value}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, updateQuery, setQuery, query],
  );

  return {
    searchInputRef,
    handleSubmit,
    outputStream,
    conversation,
    error,
    isLoading,
  };
};
