import type { ChainwebChainId } from '@kadena/chainweb-node-client';

import type { IEditorProps } from './editor';
import Editor from './editor';
import SidePanel from './SidePanel';
import { containerStyle } from './styles.css';
import { getModulesMap } from './utils';

import React from 'react';

export interface IModule {
  chainId: ChainwebChainId;
  moduleName: string;
}

export interface IModuleExplorerProps {
  modules: IModule[];
  openedModules: IEditorProps['openedModules'];
  onModuleClick: (module: IModule) => void;
}

const ModuleExplorer = ({
  modules,
  openedModules,
  onModuleClick,
}: IModuleExplorerProps) => {
  const results = getModulesMap(modules);
  return (
    <div className={containerStyle}>
      <SidePanel
        results={results}
        onResultClick={(result) => {
          onModuleClick(result);
        }}
      />
      <Editor openedModules={openedModules} />
    </div>
  );
};

export default ModuleExplorer;