import * as yup from "yup";
import { AuthenticationErrorMessages } from "./authenticationErrorMessages";

export const yupPasswordSchema = yup
  .string()
  .min(8, AuthenticationErrorMessages.PASSWORD_TOO_SHORT)
  .max(255, AuthenticationErrorMessages.PASSWORD_TOO_LONG)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    AuthenticationErrorMessages.PASSWORD_TOO_SIMPLE
  );

export const yupUserRegistrationSchema = yup.object().shape({
  email: yup
    .string()
    .min(6, AuthenticationErrorMessages.EMAIL_TOO_SHORT)
    .max(255, AuthenticationErrorMessages.EMAIL_TOO_LONG)
    .email(AuthenticationErrorMessages.EMAIL_INVALID_EMAIL),
  password: yupPasswordSchema,
  firstName: yup
    .string()
    .min(1, AuthenticationErrorMessages.TOO_SHORT)
    .max(255, AuthenticationErrorMessages.TOO_LONG),
  lastName: yup
    .string()
    .min(1, AuthenticationErrorMessages.TOO_SHORT)
    .max(255, AuthenticationErrorMessages.TOO_LONG)
});

export const yupUserLoginSchema = yup.object().shape({
  email: yup.string().email(AuthenticationErrorMessages.EMAIL_INVALID_EMAIL),
  password: yup.string()
});
