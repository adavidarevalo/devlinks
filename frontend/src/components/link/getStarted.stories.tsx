import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GetStartedComponent from './getStarted';

export default {
  title: 'Components/GetStartedComponent',
  component: GetStartedComponent,
} as ComponentMeta<typeof GetStartedComponent>;

const Template: ComponentStory<typeof GetStartedComponent> = (args) => <GetStartedComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
