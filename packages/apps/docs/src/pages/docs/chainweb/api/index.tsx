import { options } from '@/components/Layout/Redocly/Redocly';
import { Specs } from '@/components/Specs';
import apiSpecs from '@/specs/chainweb/chainweb.openapi.json';
import { ILayout } from '@/types/Layout';
import {
  checkSubTreeForActive,
  getPathName,
} from '@/utils/staticGeneration/checkSubTreeForActive.mjs';
import { GetStaticProps } from 'next';
import { OpenAPIV3 } from 'openapi-types';
import React, { FC } from 'react';

const Home: FC<ILayout> = () => {
  const specs = apiSpecs as unknown as OpenAPIV3.Document;
  return <Specs specs={specs} options={options} />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      leftMenuTree: checkSubTreeForActive(getPathName(__filename)),
      frontmatter: {
        title: 'Chainweb',
        menu: 'Chainweb',
        subTitle: 'Be a part of our ecosystem',
        label: 'Chainweb',
        order: 5,
        description: 'Be a part of our ecosystem',
        layout: 'redocly',
        icon: 'Chainweb',
      },
    },
  };
};

export default Home;
