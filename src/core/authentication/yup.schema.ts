import * as yup from "yup";
import { ErrorMessages } from "./errorMessages";

export const yupPasswordSchema = yup
  .string()
  .min(8, ErrorMessages.PASSWORD_TOO_SHORT)
  .max(255, ErrorMessages.PASSWORD_TOO_LONG)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    ErrorMessages.PASSWORD_TOO_SIMPLE
  );

export const yupUserRegistrationSchema = yup.object().shape({
  email: yup
    .string()
    .min(6, ErrorMessages.EMAIL_TOO_SHORT)
    .max(255, ErrorMessages.EMAIL_TOO_LONG)
    .email(ErrorMessages.EMAIL_INVALID_EMAIL),
  password: yupPasswordSchema,
  firstName: yup
    .string()
    .min(1, ErrorMessages.TOO_SHORT)
    .max(255, ErrorMessages.TOO_LONG),
  lastName: yup
    .string()
    .min(1, ErrorMessages.TOO_SHORT)
    .max(255, ErrorMessages.TOO_LONG)
});

export const yupUserLoginSchema = yup.object().shape({
  email: yup.string().email(ErrorMessages.EMAIL_INVALID_EMAIL),
  password: yup.string()
});
