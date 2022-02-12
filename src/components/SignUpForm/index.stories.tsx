import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SignUpFormProps } from '@adamldoyle/react-aws-auth-context-core';
import { SignUpForm } from './';

export default {
  title: 'components/SignUpForm',
  component: SignUpForm,
  args: {
    switchMode: action('switchMode'),
    signUp: action('signUp'),
  },
} as Meta;

const Template: Story<SignUpFormProps> = (args) => <SignUpForm {...args} />;

export const Default = Template.bind({});

export const SignUpError = Template.bind({});
SignUpError.args = {
  signUp: () => {
    throw new Error('Storybook error signing up');
  },
};
