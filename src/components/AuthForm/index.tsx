import React, { useCallback } from 'react';
import { Avatar, Button, Grid, FormHelperText, Box, Typography, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as Yup from 'yup';
import { useForm, Control, UseFormGetValues, ResolverResult } from 'react-hook-form';
import { useYupValidationResolver } from '../useYupValidationResolver';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface AuthFormProps<Values> {
  title: string;
  Schema: Yup.BaseSchema;
  formDefaults: Values;
  validate?: (values: Values) => Promise<Record<string, string> | undefined> | Record<string, string> | undefined;
  formDescription?: string;
  submitLabel: string;
  onSubmit: (values: Values) => Promise<void>;
  actions?: (getValues: UseFormGetValues<Values>) => React.ReactNode;
  renderFormBody: (control: Control) => React.ReactNode;
}

export function AuthForm<Values>({
  title,
  Schema,
  formDefaults,
  validate,
  formDescription,
  submitLabel,
  onSubmit,
  actions,
  renderFormBody,
}: AuthFormProps<Values>): JSX.Element {
  const classes = useStyles();

  const yupResolver = useYupValidationResolver(Schema);

  const resolver = useCallback(
    async (values: Values) => {
      const yupResults = await yupResolver(values);
      if (Object.keys(yupResults.errors).length === 0 && validate) {
        const errors = await validate(values);
        if (errors) {
          return Object.entries(errors).reduce<ResolverResult>(
            (acc, error) => {
              acc.errors[error[0]] = { message: error[1] };
              return acc;
            },
            { values: {}, errors: {} },
          );
        }
      }
      return yupResults;
    },
    [yupResolver, validate],
  );

  const { formState, getValues, setError, clearErrors, handleSubmit, control } = useForm({
    defaultValues: formDefaults,
    mode: 'onSubmit',
    resolver,
  });

  const onInternalSubmit = async (values: Values) => {
    clearErrors('_root');
    try {
      await onSubmit(values);
    } catch (err) {
      setError('_root', { message: err.message });
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={4}>
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onInternalSubmit)}>
            <Grid container spacing={2}>
              {formDescription && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">{formDescription}</Typography>
                </Grid>
              )}
              {formState.errors['_root'] && (
                <Grid item xs={12}>
                  <FormHelperText error={true}>{formState.errors['_root'].message}</FormHelperText>
                </Grid>
              )}

              {renderFormBody(control)}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={formState.isSubmitting}
            >
              {submitLabel}
            </Button>
            {Boolean(actions) && actions(getValues)}
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
