import { Checkbox, CheckboxProps, FormControlLabel, FormHelperText, makeStyles } from '@material-ui/core';
import { useController, Control } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  error: {
    color: `${theme.palette.error.main} !important`,
  },
}));

export interface CheckboxFieldProps {
  label: string;
  name: string;
  control: Control;
}

type AllProps = CheckboxFieldProps & CheckboxProps;

export function CheckboxField({ label, name, control, ...checkboxProps }: AllProps): JSX.Element {
  const classes = useStyles();
  const { field, fieldState } = useController({ name, control });
  const showError = Boolean(fieldState.error);

  return (
    <>
      <FormControlLabel
        className={showError ? classes.error : undefined}
        control={
          <Checkbox
            checked={field.value}
            inputProps={field}
            color="primary"
            classes={{
              root: showError ? classes.error : undefined,
            }}
            {...checkboxProps}
          />
        }
        label={label}
      />
      {showError && <FormHelperText error={true}>{fieldState.error.message}</FormHelperText>}
    </>
  );
}
