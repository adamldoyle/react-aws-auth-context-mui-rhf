import { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SignOutProps } from '@adamldoyle/react-aws-auth-context-core';

export function SignOut({ signOut }: SignOutProps): JSX.Element {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      await signOut();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [signOut]);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h5" align="center">
          Signing out...
        </Typography>
      </Grid>
    </Grid>
  );
}
