import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
  return err.inner.map(
    ({ path, message }: { path: string; message: string }) => ({
      path,
      message
    })
  );
};
