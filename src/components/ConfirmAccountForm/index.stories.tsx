import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ConfirmAccountFormProps } from '@adamldoyle/react-aws-auth-context-core';
import { ConfirmAccountForm } from './';

export default {
  title: 'components/ConfirmAccountForm',
  component: ConfirmAccountForm,
  args: {
    email: 'sample@sample.com',
    resendCode: action('resendCode'),
    confirmAccount: action('confirmAccount'),
  },
} as Meta;

const Template: Story<ConfirmAccountFormProps> = (args) => <ConfirmAccountForm {...args} />;

export const Default = Template.bind({});

export const ConfirmAccountError = Template.bind({});
ConfirmAccountError.args = {
  confirmAccount: () => {
    throw new Error('Storybook error confirming account');
  },
};
