import React from 'react';
import { Link, Grid, Box } from '@material-ui/core';
import * as Yup from 'yup';
import { SignUpFormProps, AuthMode } from '@adamldoyle/react-aws-auth-context-core';
import { InputField } from '../InputField';
import { CheckboxField } from '../CheckboxField';
import { AuthForm } from '../AuthForm';

const Schema = Yup.object({
  firstName: Yup.string().default(''),
  lastName: Yup.string().default(''),
  email: Yup.string().default('').required('Email is required').email('Invalid email syntax'),
  password: Yup.string().default('').required('Password is required'),
  passwordConfirm: Yup.string().default('').required('Password confirmation is required'),
  allowMarketing: Yup.boolean().default(false),
});

const formDefaults = Schema.getDefault();

export function SignUpForm({ email, signUp, switchMode }: SignUpFormProps): JSX.Element {
  return (
    <AuthForm
      title="Sign up"
      Schema={Schema}
      formDefaults={{ ...formDefaults, email: email ?? '' }}
      submitLabel="Sign up"
      onSubmit={signUp}
      validate={(values) => {
        if (values.password && values.password !== values.passwordConfirm) {
          return { passwordConfirm: 'Password confirmation must match' };
        }
      }}
      renderFormBody={(control) => (
        <>
          <Grid item xs={12} sm={6}>
            <InputField
              label="First name"
              name="firstName"
              autoComplete="given-name"
              variant="outlined"
              fullWidth
              autoFocus
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              variant="outlined"
              fullWidth
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              variant="outlined"
              fullWidth
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Password (confirm)"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              variant="outlined"
              fullWidth
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxField
              label="I want to receive marketing promotions and updates via email."
              name="allowMarketing"
              control={control}
            />
          </Grid>
        </>
      )}
      actions={(getValues) => (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Link
            component="button"
            variant="body2"
            onClick={(evt: React.MouseEvent) => {
              evt.preventDefault();
              return switchMode(AuthMode.SIGN_IN, getValues('email'));
            }}
          >
            Already have an account? Sign in
          </Link>
        </Box>
      )}
    />
  );
}
