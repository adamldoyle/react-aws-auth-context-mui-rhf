import { TextField, TextFieldProps } from '@material-ui/core';
import { useController, Control } from 'react-hook-form';

export interface InputFieldProps {
  label: string;
  name: string;
  control: Control;
}

type AllProps = InputFieldProps & TextFieldProps;

export function InputField({ label, name, control, ...textFieldProps }: AllProps): JSX.Element {
  const { field, fieldState } = useController({ name, control });
  const showError = Boolean(fieldState.error);
  return (
    <TextField
      id={`${name}-input`}
      label={label}
      fullWidth
      error={showError}
      helperText={showError ? fieldState.error.message : undefined}
      InputProps={field}
      {...textFieldProps}
    />
  );
}
