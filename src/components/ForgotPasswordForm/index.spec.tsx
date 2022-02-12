import { render, fireEvent, waitFor } from '@testing-library/react';
import { changeInputValue } from '../AuthForm/formUtilities.spec';
import { AuthMode } from '@adamldoyle/react-aws-auth-context-core';
import { ForgotPasswordForm } from './';

describe('ForgotPasswordForm', () => {
  const renderComponent = (email = undefined, onSubmit = jest.fn(), switchMode = jest.fn()) => {
    return render(<ForgotPasswordForm email={email} resetPassword={onSubmit} switchMode={switchMode} />);
  };

  it('submits values from form', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(undefined, onSubmit);
    changeInputValue(rendered, 'Email', 'testEmail@gmail.com');
    fireEvent.click(rendered.getByRole('button', { name: 'Reset password' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({ email: 'testEmail@gmail.com' });
  });

  it('requires all fields', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(undefined, onSubmit);
    fireEvent.click(rendered.getByRole('button', { name: 'Reset password' }));
    await waitFor(() => expect(rendered.queryByText('Email is required')).not.toBeNull());
    expect(onSubmit).not.toBeCalled();
  });

  it('supports using default email value', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent('defaultEmail@gmail.com', onSubmit);
    fireEvent.click(rendered.getByRole('button', { name: 'Reset password' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({ email: 'defaultEmail@gmail.com' });
  });

  it('shows submission errors', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('testError'));
    const rendered = renderComponent('defaultEmail@gmail.com', onSubmit);
    fireEvent.click(rendered.getByRole('button', { name: 'Reset password' }));
    expect(onSubmit).not.toBeCalled();
    await waitFor(() => expect(rendered.queryByText('testError')).not.toBeNull());
  });

  it('provides button to change to sign in', () => {
    const switchMode = jest.fn();
    const rendered = renderComponent(undefined, undefined, switchMode);
    changeInputValue(rendered, 'Email', 'testEmail@gmail.com');
    fireEvent.click(rendered.getByRole('button', { name: 'Remember your password? Sign in' }));
    expect(switchMode).toBeCalledWith(AuthMode.SIGN_IN, 'testEmail@gmail.com');
  });

  it('provides button to change to sign up', () => {
    const switchMode = jest.fn();
    const rendered = renderComponent(undefined, undefined, switchMode);
    changeInputValue(rendered, 'Email', 'testEmail@gmail.com');
    fireEvent.click(rendered.getByRole('button', { name: "Don't have an account? Sign up" }));
    expect(switchMode).toBeCalledWith(AuthMode.SIGN_UP, 'testEmail@gmail.com');
  });
});
