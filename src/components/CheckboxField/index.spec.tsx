import { render, fireEvent, waitFor } from '@testing-library/react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { CheckboxField } from './';

const TestForm = ({ onSubmit, defaultValue, required }) => {
  const Schema = Yup.object({
    testField: Yup.boolean()
      .default(defaultValue)
      .oneOf(required ? [true] : [true, false], 'Test field is required'),
  });

  const resolver = useYupValidationResolver(Schema);
  const formDefaults = Schema.getDefault();
  const { handleSubmit, control } = useForm({ defaultValues: formDefaults, mode: 'onSubmit', resolver });
  const handleTestSubmit = (values) => {
    onSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit(handleTestSubmit)}>
      <CheckboxField control={control} label="Test label" name="testField" />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('CheckboxField', () => {
  const renderComponent = (onSubmit = jest.fn(), defaultValue = false, required = false) => {
    return render(<TestForm onSubmit={onSubmit} defaultValue={defaultValue} required={required} />);
  };

  it('supports defaulting to unchecked', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(onSubmit);
    fireEvent.click(rendered.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({ testField: false });
  });

  it('supports defaulting to checked', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(onSubmit, true);
    fireEvent.click(rendered.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({ testField: true });
  });

  it('supports switching value', async () => {
    const onSubmit = jest.fn();
    const rendered = renderComponent(onSubmit);
    fireEvent.click(rendered.getByLabelText('Test label'));
    fireEvent.click(rendered.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(onSubmit).toBeCalled());
    expect(onSubmit).toBeCalledWith({ testField: true });
  });

  it('shows errors', async () => {
    const rendered = renderComponent(undefined, false, true);
    fireEvent.click(rendered.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(rendered.queryByText('Test field is required')).not.toBeNull());
  });
});
