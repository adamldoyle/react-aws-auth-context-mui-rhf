import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthMode } from '@adamldoyle/react-aws-auth-context-core';
import { changeInputValue } from '../AuthForm/formUtilities.spec';
import { SignInForm } from './';

describe('SignInForm', () => {
  const renderComponent = (email = undefined, onSubmit = jest.fn(), switchMode = jest.fn()) => {
    return render(<SignInForm email={email} signIn={onSubmit} switchMode={switchMode} />);
  };

  it('submits values from form', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(undefined, onSubmit);
    changeInputValue(rendered, 'Email', 'testEmail@gmail.com');
    changeInputValue(rendered, 'Password', 'testPassword');
    fireEvent.click(rendered.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({
      email: 'testEmail@gmail.com',
      password: 'testPassword',
    });
  });

  it('supports using default email value', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent('defaultEmail@gmail.com', onSubmit);
    changeInputValue(rendered, 'Password', 'testPassword');
    fireEvent.click(rendered.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({
      email: 'defaultEmail@gmail.com',
      password: 'testPassword',
    });
  });

  it('requires all fields', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(undefined, onSubmit);
    fireEvent.click(rendered.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(rendered.queryByText('Email is required')).not.toBeNull());
    expect(rendered.queryByText('Password is required')).not.toBeNull();
    expect(onSubmit).not.toBeCalled();
  });

  it('shows submission errors', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('testError'));
    const rendered = renderComponent('testEmail@gmail.com', onSubmit);
    changeInputValue(rendered, 'Password', 'testPassword');
    fireEvent.click(rendered.getByRole('button', { name: 'Sign in' }));
    expect(onSubmit).not.toBeCalled();
    await waitFor(() => expect(rendered.queryByText('testError')).not.toBeNull());
  });

  it('provides button to change to sign up', () => {
    const switchMode = jest.fn();
    const rendered = renderComponent(undefined, undefined, switchMode);
    changeInputValue(rendered, 'Email', 'testEmail@gmail.com');
    fireEvent.click(rendered.getByRole('button', { name: "Don't have an account? Sign up" }));
    expect(switchMode).toBeCalledWith(AuthMode.SIGN_UP, 'testEmail@gmail.com');
  });

  it('provides button to change to forgot password', () => {
    const switchMode = jest.fn();
    const rendered = renderComponent(undefined, undefined, switchMode);
    changeInputValue(rendered, 'Email', 'testEmail@gmail.com');
    fireEvent.click(rendered.getByRole('button', { name: 'Forgot your password? Reset it' }));
    expect(switchMode).toBeCalledWith(AuthMode.FORGOT_PASSWORD, 'testEmail@gmail.com');
  });
});
