import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, Box } from '@material-ui/core';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { InputField, InputFieldProps } from './';

export default {
  title: 'components/InputField',
  component: InputField,
  argTypes: { onSubmit: { action: 'clicked' } },
} as Meta;

interface StoryArgs {
  defaultValue: string;
  required: boolean;
  onSubmit: (values: any) => {};
}

type AllProps = InputFieldProps & StoryArgs;

const Template: Story<AllProps> = ({ defaultValue, required, onSubmit, ...args }) => {
  const field = Yup.string().default(defaultValue);
  const Schema = Yup.object({
    [args.name]: required ? field.required(`${args.label} is required`) : field,
  });
  const resolver = useYupValidationResolver(Schema);
  const formDefaults = Schema.getDefault();
  const { handleSubmit, control } = useForm({ defaultValues: formDefaults, mode: 'onSubmit', resolver });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <InputField {...args} control={control} />
      </Box>
      <Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Test field',
  name: 'testField',
  type: 'text',
  defaultValue: '',
  required: false,
};
