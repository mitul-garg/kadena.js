import type { IProfileCardProps } from '@components/ProfileCard';
import { ProfileCard } from '@components/ProfileCard';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<IProfileCardProps> = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  argTypes: {
    name: {
      control: {
        type: 'text',
      },
    },
    title: {
      control: {
        type: 'text',
      },
    },

    imageSrc: {
      control: {
        type: 'text',
      },
    },
    tags: {
      control: {
        type: 'array',
      },
    },
  },
};

export default meta;

type Story = StoryObj<IProfileCardProps>;

export const Primary: Story = {
  name: 'ProfileCard',
  args: {
    name: 'Tasos Bitsios',
    title: 'Developer Experience Developer (DED)',
    tags: ['Chainweb-stream', 'SSE'],
    imageSrc: 'https://avatars.githubusercontent.com/u/115649719?v=4',
    links: {
      'Personal website': 'https://tasosbitsios.com',
      Twitter: 'https://twitter.com/tasosbitsios',
      'Custom link': 'https://kadena.io',
    },
  },
  render: ({ name, title, tags, imageSrc, links }) => {
    return (
      <ProfileCard
        name={'Tasos Bitsios'}
        title={'Developer Experience Developer (DED)'}
        tags={['Chainweb-stream', 'SSE']}
        imageSrc={'https://avatars.githubusercontent.com/u/115649719?v=4'}
        links={{
          'Personal website': 'https://tasosbitsios.com',
          Twitter: 'https://twitter.com/tasosbitsios',
          'Custom link': 'https://kadena.io',
        }}
      />
    );
  },
};
