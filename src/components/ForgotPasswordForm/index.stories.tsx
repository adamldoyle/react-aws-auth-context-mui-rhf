import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ForgotPasswordFormProps } from '@adamldoyle/react-aws-auth-context-core';
import { ForgotPasswordForm } from './';

export default {
  title: 'components/ForgotPasswordForm',
  component: ForgotPasswordForm,
  args: {
    resetPassword: action('resetPassword'),
    switchMode: action('switchMode'),
  },
} as Meta;

const Template: Story<ForgotPasswordFormProps> = (args) => <ForgotPasswordForm {...args} />;

export const Default = Template.bind({});

export const ForgotPasswordError = Template.bind({});
ForgotPasswordError.args = {
  resetPassword: () => {
    throw new Error('Storybook error reseting password');
  },
};
