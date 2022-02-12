import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SignInFormProps } from '@adamldoyle/react-aws-auth-context-core';
import { SignInForm } from './';

export default {
  title: 'components/SignInForm',
  component: SignInForm,
  args: {
    switchMode: action('switchMode'),
    signIn: action('signIn'),
  },
} as Meta;

const Template: Story<SignInFormProps> = (args) => <SignInForm {...args} />;

export const Default = Template.bind({});

export const SignInError = Template.bind({});
SignInError.args = {
  signIn: () => {
    throw new Error('Storybook error signing in');
  },
};
