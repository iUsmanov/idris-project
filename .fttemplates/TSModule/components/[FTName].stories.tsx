import { Meta, StoryObj } from '@storybook/react';
import { [FTName] } from './[FTName]';

export default {
   title: 'shared/[FTName]',
   component: [FTName],
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as StoryObj<typeof [FTName]>;

const Template: Meta<typeof [FTName]> = (args) => <[FTName] {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
