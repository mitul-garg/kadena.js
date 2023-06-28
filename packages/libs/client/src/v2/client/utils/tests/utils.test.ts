import {
  getPromise,
  getUrl,
  IPollRequestPromise,
  jsonRequest,
  kadenaHostGenerator,
  mapRecord,
  mergeAll,
  mergeAllPollRequestPromises,
} from '../utils';

describe('client utils', () => {
  describe('jsonRequest', () => {
    it('returns a request object form a json', () => {
      const body = { prop: 'test' };
      const result = jsonRequest(body);
      expect(result).toEqual({
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body),
      });
    });
  });

  describe('getUrl', () => {
    it('returns a full url from the host and endpoint', () => {
      const host = 'http://host';
      const endpoint = 'api/test';
      expect(getUrl(host, endpoint)).toBe('http://host/api/test');
    });

    it('skips the back slashed and join two parts only with one back slash', () => {
      const host = 'http://host/';
      const endpoint = '/api/test';
      expect(getUrl(host, endpoint)).toBe('http://host/api/test');
    });

    it('adds query params if they are presented and not undefined', () => {
      const host = 'http://host/';
      const endpoint = '/api/test';
      const params = {
        first: undefined,
        second: true,
        third: 'test',
      };
      expect(getUrl(host, endpoint, params)).toBe(
        'http://host/api/test?second=true&third=test',
      );
    });
  });

  describe('kadenaHostGenerator', () => {
    it('returns mainnet url with the correct chianId', () => {
      expect(kadenaHostGenerator('mainnet01', '14')).toBe(
        'https://api.chainweb.com/chainweb/0.0/mainnet01/chain/14/pact',
      );
    });

    it('returns testnet url with the correct chianId', () => {
      expect(kadenaHostGenerator('testnet04', '14')).toBe(
        'https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/14/pact',
      );
    });

    it('throes exception if networkId is not either mainnet01 nor testnet04 ', () => {
      expect(() => kadenaHostGenerator('incorrect-network', '14')).toThrowError(
        Error(`UNKNOWN_NETWORK_ID: incorrect-network`),
      );
    });
  });

  describe('getPromise', () => {
    it('returns a wrapped object of a promise the resolve and reject function', () => {
      const obj = getPromise();
      expect(obj.promise).toBeDefined();
      expect(obj.resolve).toBeDefined();
      expect(obj.reject).toBeDefined();
    });

    it('resolves the promise if resolve function is called', (done) => {
      const pr = getPromise();
      pr.promise
        .then((result) => {
          expect(result).toBe('result');
          done();
        })
        .catch(() => {
          expect('this should not happen').toBe(true);
          done();
        });
      pr.resolve('result');
    });

    it('rejects the promise if reject function is called', (done) => {
      const pr = getPromise();
      pr.promise
        .then(() => {
          expect('this should not happen').toBe(true);
          done();
        })
        .catch((result) => {
          expect(result).toBe('rejected');
          done();
        });
      pr.reject('rejected');
    });

    it('sets fullfiled to true resolve is called', (done) => {
      const pr = getPromise();
      pr.promise
        .then((result) => {
          expect(pr.fulfilled).toBe(true);
          done();
        })
        .catch(() => {
          expect('this should not happen').toBe(true);
          done();
        });
      pr.resolve('result');
    });

    it('sets fullfiled to true if reject is called', (done) => {
      const pr = getPromise();
      pr.promise
        .then(() => {})
        .catch((result) => {
          expect(pr.fulfilled).toBe(true);
          done();
        });
      pr.reject('rejected');
    });

    it('sets data if resolve is called', (done) => {
      const pr2 = getPromise();
      pr2.promise
        .then((result) => {
          expect(pr2.fulfilled).toBe(true);
          expect(pr2.data).toBe('result');
          expect(result).toBe('result');
          done();
        })
        .catch(() => {});
      pr2.resolve('result');
    });
  });

  describe('mergeAll', () => {
    it('merge all of the input objects to one', () => {
      expect(mergeAll([{ prop1: 'test' }, { prop2: 'test' }])).toEqual({
        prop1: 'test',
        prop2: 'test',
      });
    });

    it('uses last item value if there are duplicated property', () => {
      expect(mergeAll([{ prop: 'test-1' }, { prop: 'test-2' }])).toEqual({
        prop: 'test-2',
      });
    });
  });

  describe('mergeAllPollRequestPromises', () => {
    it('merge all input poll promises into one', async () => {
      const pr1: IPollRequestPromise<string> = Object.assign(
        Promise.resolve({ key1: 'r1' }),
        {
          requests: { key1: Promise.resolve('r1') },
        },
      );

      const pr2: IPollRequestPromise<string> = Object.assign(
        Promise.resolve({ key2: 'r2' }),
        {
          requests: { key2: Promise.resolve('r2') },
        },
      );
      const mergedPr = mergeAllPollRequestPromises([pr1, pr2]);

      expect(Object.keys(mergedPr.requests)).toEqual(['key1', 'key2']);

      const res = await Promise.all([
        mergedPr,
        mergedPr.requests.key1,
        mergedPr.requests.key2,
      ]);

      expect(res[0]).toEqual({
        key1: 'r1',
        key2: 'r2',
      });

      expect(res[1]).toEqual('r1');
      expect(res[2]).toEqual('r2');
    });
  });

  describe('mapRecord', () => {
    it('map each item in a record by using the mapper function', () => {
      const input = {
        key1: { prop: 'one' },
        key2: { prop: 'two' },
      };

      const result = mapRecord(input, ({ prop }) => prop);

      expect(result).toEqual({
        key1: 'one',
        key2: 'two',
      });
    });
  });
});
