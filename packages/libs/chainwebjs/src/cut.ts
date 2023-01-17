import { baseUrl, retryFetch, transFormUrl } from './request';
import { cutPeerPage, parseResponse } from './internal';
import { ICutPeerItem, ICutResponse, IRetryOptions } from './types';
import fetch from 'cross-fetch';

/**
 * Cut the current cut from a chainweb node
 *
 * @param network - chainweb network
 * @param host - chainweb api host
 * @param retryOptions - retry options object as accepted by the retry package
 *
 * @alpha
 */

export async function currentCut(
  network?: string,
  host?: string,
  retryOptions?: IRetryOptions,
): Promise<ICutResponse> {
  const result = await retryFetch(
    () => fetch(transFormUrl(baseUrl(network, host, 'cut'))),
    retryOptions,
  );
  return parseResponse<ICutResponse>(result);
}

/**
 * P2P peers of the cut network
 *
 * @param network - chainweb network
 * @param host - chainweb api host
 * @param retryOptions - retry options object as accepted by the retry package
 *
 * @alpha
 */
export async function cutPeers(
  network?: string,
  host?: string,
  retryOptions?: IRetryOptions,
): Promise<ICutPeerItem[]> {
  const page = await cutPeerPage(network, host, retryOptions);
  return page.items.reverse();
}
