import { allow } from "graphql-shield";
import { isAuthenticated } from "../../rules";

export const permissions = {
  Query: {
    me: isAuthenticated
  },
  Mutation: {
    registerUser: allow,
    login: allow,
    logout: isAuthenticated,
    forgotPasswordChange: allow,
    sendForgotPasswordEmail: allow
  }
};
