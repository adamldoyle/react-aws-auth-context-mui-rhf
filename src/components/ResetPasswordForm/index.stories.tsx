import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ResetPasswordFormProps } from '@adamldoyle/react-aws-auth-context-core';
import { ResetPasswordForm } from './';

export default {
  title: 'components/ResetPasswordForm',
  component: ResetPasswordForm,
  args: {
    resetPassword: action('resetPassword'),
  },
} as Meta;

const Template: Story<ResetPasswordFormProps> = (args) => <ResetPasswordForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  email: 'sample@sample.com',
};

export const ResetPasswordError = Template.bind({});
ResetPasswordError.args = {
  resetPassword: () => {
    throw new Error('Storybook error reseting password');
  },
};
