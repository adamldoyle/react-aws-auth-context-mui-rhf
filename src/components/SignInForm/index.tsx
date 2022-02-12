import { Link, Box, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import { SignInFormProps, AuthMode } from '@adamldoyle/react-aws-auth-context-core';
import { InputField } from '../InputField';
import { AuthForm } from '../AuthForm';

const Schema = Yup.object({
  email: Yup.string().default('').required('Email is required').email('Invalid email syntax'),
  password: Yup.string().default('').required('Password is required'),
});

const formDefaults = Schema.getDefault();

export function SignInForm({ email, signIn, switchMode }: SignInFormProps): JSX.Element {
  return (
    <AuthForm
      title="Sign in"
      Schema={Schema}
      formDefaults={{ ...formDefaults, email: email ?? '' }}
      submitLabel="Sign in"
      onSubmit={signIn}
      renderFormBody={(control) => (
        <>
          <Grid item xs={12}>
            <InputField
              label="Email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
              autoFocus
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
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
              return switchMode(AuthMode.SIGN_UP, getValues('email'));
            }}
          >
            Don&#39;t have an account? Sign up
          </Link>
          <Link
            component="button"
            variant="body2"
            onClick={(evt: React.MouseEvent) => {
              evt.preventDefault();
              return switchMode(AuthMode.FORGOT_PASSWORD, getValues('email'));
            }}
          >
            Forgot your password? Reset it
          </Link>
        </Box>
      )}
    />
  );
}
