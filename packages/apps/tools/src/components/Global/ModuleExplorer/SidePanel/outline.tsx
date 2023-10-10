import { contractParser } from '@kadena/pactjs-generator';
import type { ITreeProps } from '@kadena/react-ui';
import { Button, Heading, Text, Tree } from '@kadena/react-ui';

import type { IChainModule } from '../types';

import React from 'react';

export interface IOutlineProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedModule?: IChainModule;
  onInterfaceClick: (module: IChainModule) => void;
}

type Contract = ReturnType<typeof contractParser>[0][0]; // TODO: fix this because it's ugly/nasty

const contractToTreeItems = (
  contract: Contract,
  onInterfaceClick: IOutlineProps['onInterfaceClick'],
  module: IOutlineProps['selectedModule'],
): ITreeProps['items'] => {
  const { usedInterface: interfaces, capabilities, functions } = contract;
  const items: ITreeProps['items'] = [];

  if (interfaces?.length) {
    items.push({
      title: 'Interfaces',
      isOpen: true,
      items: interfaces.map((i) => ({
        title: (
          <Button
            onClick={() =>
              onInterfaceClick({ chainId: module!.chainId, moduleName: i.name })
            }
            variant="compact"
            icon="ExitToApp"
          >
            {i.name}
          </Button>
        ),
      })),
    });
  }

  if (capabilities?.length) {
    items.push({
      title: 'Capabilities',
      items: capabilities.map((c) => ({
        title: c.name,
      })),
    });
  }

  if (functions?.length) {
    items.push({
      title: 'Functions',
      items: functions.map((f) => ({
        title: f.name,
      })),
    });
  }

  return items;
};

const Outline = (props: IOutlineProps): React.JSX.Element => {
  const { selectedModule, onInterfaceClick } = props;

  let parsedContract: Contract;
  if (selectedModule) {
    const [, namespace] = selectedModule.moduleName.split('.');
    const [parsedModules] = contractParser(selectedModule.code!, namespace);
    parsedContract = parsedModules[0]; // TODO: improve this
  }

  return (
    <div {...props}>
      <Heading as="h4">
        Outline
        {selectedModule
          ? ` ${selectedModule.moduleName} @ ${selectedModule.chainId}`
          : null}
      </Heading>
      {selectedModule ? (
        <Tree
          items={contractToTreeItems(
            parsedContract!,
            onInterfaceClick,
            selectedModule,
          )}
          isOpen
        />
      ) : (
        <Text>
          Select/open a module to see the outline of the contract/module
        </Text>
      )}
    </div>
  );
};

export default Outline;
