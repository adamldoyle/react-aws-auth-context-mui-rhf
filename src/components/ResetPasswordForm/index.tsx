import { Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { ResetPasswordFormProps } from '@adamldoyle/react-aws-auth-context-core';
import { InputField } from '../InputField';
import { AuthForm } from '../AuthForm';

const Schema = Yup.object({
  code: Yup.string().default('').required('Code is required'),
  password: Yup.string().default('').required('Password is required'),
  passwordConfirm: Yup.string().default('').required('Password confirmation is required'),
});

const formDefaults = Schema.getDefault();

export function ResetPasswordForm({ email, resetPassword }: ResetPasswordFormProps): JSX.Element {
  return (
    <AuthForm
      title="Change password"
      Schema={Schema}
      formDefaults={formDefaults}
      formDescription="A reset password code was sent to your email. Enter it and a new password to change your password."
      submitLabel="Change password"
      onSubmit={resetPassword}
      validate={(values) => {
        if (values.password && values.password !== values.passwordConfirm) {
          return { passwordConfirm: 'Password confirmation must match' };
        }
      }}
      renderFormBody={(control) => (
        <>
          <Grid item xs={12}>
            <Typography>Email: {email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Code"
              name="code"
              autoComplete="one-time-code"
              variant="outlined"
              fullWidth
              autoFocus
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="New password"
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
              label="New password (confirm)"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              variant="outlined"
              fullWidth
              control={control}
            />
          </Grid>
        </>
      )}
    />
  );
}
