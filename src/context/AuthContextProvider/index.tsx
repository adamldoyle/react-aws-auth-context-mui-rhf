import React from 'react';
import { AuthContextProvider as AuthContextCoreProvider } from '@adamldoyle/react-aws-auth-context-core';
import {
  SignInForm,
  SignUpForm,
  SignOut,
  ResetPasswordForm,
  ForgotPasswordForm,
  ConfirmAccountForm,
} from '../../components';

export type AuthContextProviderProps = {
  children: React.ReactNode;
  sessionPingDelay?: number;
};

export function AuthContextProvider({ children, sessionPingDelay = -1 }: AuthContextProviderProps): JSX.Element {
  return (
    <AuthContextCoreProvider
      sessionPingDelay={sessionPingDelay}
      SignInForm={SignInForm}
      SignUpForm={SignUpForm}
      SignOut={SignOut}
      ResetPasswordForm={ResetPasswordForm}
      ForgotPasswordForm={ForgotPasswordForm}
      ConfirmAccountForm={ConfirmAccountForm}
    >
      {children}
    </AuthContextCoreProvider>
  );
}
