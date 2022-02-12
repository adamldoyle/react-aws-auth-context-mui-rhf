import { render, fireEvent, waitFor } from '@testing-library/react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { InputField } from './';

const TestForm = ({ onSubmit, defaultValue, required }) => {
  const field = Yup.string().default(defaultValue);
  const Schema = Yup.object({
    testField: required ? field.required('Test field is required') : field,
  });
  const resolver = useYupValidationResolver(Schema);
  const formDefaults = Schema.getDefault();
  const { handleSubmit, control } = useForm({ defaultValues: formDefaults, mode: 'onSubmit', resolver });
  const handleTestSubmit = (values) => {
    onSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit(handleTestSubmit)}>
      <InputField control={control} label="Test label" name="testField" />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('InputField', () => {
  const renderComponent = (onSubmit = jest.fn(), defaultValue = '', required = false) => {
    return render(<TestForm onSubmit={onSubmit} defaultValue={defaultValue} required={required} />);
  };

  it('supports defaulting to value', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(onSubmit, 'defaultValue');
    fireEvent.click(rendered.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({ testField: 'defaultValue' });
  });

  it('supports switching value', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(onSubmit);
    fireEvent.change(rendered.getByLabelText('Test label'), {
      target: { value: 'newValue' },
    });
    fireEvent.click(rendered.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({ testField: 'newValue' });
  });

  it('shows errors', async () => {
    const rendered = renderComponent(undefined, '', true);
    fireEvent.click(rendered.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(rendered.queryByText('Test field is required')).not.toBeNull());
  });
});
