export enum AuthenticationErrorMessages {
  // GENERIC min 1, max 255
  TOO_SHORT = "Must be at least 1 character",
  TOO_LONG = "Must be less than 255 characters",
  GENERIC_FAILURE = "User could not be registered",

  // EMAIL errors
  EMAIL_DUPLICATE = "Email already in user",
  EMAIL_INVALID_EMAIL = "Email must be a valid Email",
  EMAIL_TOO_SHORT = "Email must be at least 6 characters",
  EMAIL_TOO_LONG = "Email must be less than 255 characters",
  EMAIL_NOT_CONFIRMED = "You must confirm your email before signing in",

  // PASSWORD errors
  PASSWORD_TOO_SHORT = "Password must be at least 8 characters",
  PASSWORD_TOO_LONG = "Password must be less than 255 characters",
  PASSWORD_TOO_SIMPLE = "Password must contain at least one of the following uppercase letter, lowercase letter, numeric character, special character",
  // Reset key expired
  EXPIRED_KEY = "Link has expired",

  // LOGIN errors
  INVALID_LOGIN = "Invalid Login",
  ACCOUNT_LOCKED = "Account Locked"
}
