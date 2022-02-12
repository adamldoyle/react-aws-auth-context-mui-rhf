import { useCallback } from 'react';
import * as Yup from 'yup';

// I'm lazy and adding any kind of typing to this messes up AuthForm
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useYupValidationResolver = (validationSchema: Yup.BaseSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );
