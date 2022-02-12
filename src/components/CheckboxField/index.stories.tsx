import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, Box } from '@material-ui/core';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { CheckboxField, CheckboxFieldProps } from './';

export default {
  title: 'components/CheckboxField',
  component: CheckboxField,
  argTypes: { onSubmit: { action: 'clicked' } },
} as Meta;

interface StoryArgs {
  defaultValue: boolean;
  required: boolean;
  onSubmit: (values: any) => {};
}

type AllProps = CheckboxFieldProps & StoryArgs;

const Template: Story<AllProps> = ({ defaultValue, required, onSubmit, ...args }) => {
  const Schema = Yup.object({
    [args.name]: Yup.boolean()
      .default(defaultValue)
      .oneOf(required ? [true] : [true, false], `${args.label} is required`),
  });
  const resolver = useYupValidationResolver(Schema);
  const formDefaults = Schema.getDefault();
  const { handleSubmit, control } = useForm({ defaultValues: formDefaults, mode: 'onSubmit', resolver });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CheckboxField {...args} control={control} />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Test field',
  field: 'testField',
  defaultValue: false,
  required: false,
};
