import { nullishOrEmpty } from '@utils/nullish-or-empty';
import { builder } from '../builder';

builder.objectType('ExecPayload', {
  description: 'The payload of an exec transaction.',
  fields: (t) => ({
    code: t.exposeString('code', {
      description:
        'The Pact expressions executed in this transaction when it is an `exec` transaction.',
      nullable: true,
    }),
    data: t.exposeString('data', {
      description:
        'The environment data made available to the transaction. Formatted as raw JSON.',
    }),
  }),
});

builder.objectType('ContPayload', {
  description: 'The payload of an cont transaction.',
  fields: (t) => ({
    pactId: t.exposeString('pactId', {
      description:
        'A unique id when a pact (defpact) is initiated. See the "Pact execution scope and pact-id" explanation in the docs for more information.',
      nullable: true,
    }),
    step: t.exposeInt('step', {
      description:
        'The step-number when this is an execution of a `defpact`, aka multi-step transaction.',
      nullable: true,
    }),
    rollback: t.exposeBoolean('rollback', {
      description: 'Whether or not this transaction can be rolled back.',
      nullable: true,
    }),
    data: t.exposeString('data', {
      description:
        'The environment data made available to the transaction. Formatted as raw JSON.',
    }),
    proof: t.exposeString('proof', {
      description:
        'The proof provided to continue the cross-chain transaction.',
      nullable: true,
    }),
  }),
});

export default builder.unionType('Payload', {
  description: 'The payload of a transaction.',
  types: ['ExecPayload', 'ContPayload'],
  resolveType(payload) {
    if ('pactId' in payload) {
      if (payload.pactId === null) {
        return 'ExecPayload';
      } else {
        return 'ContPayload';
      }
    }
  },
});
