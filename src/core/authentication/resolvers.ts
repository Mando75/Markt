import { ResolverMap } from "../../types/graphql-utils";

import {
  forgotPasswordChange,
  login,
  logout,
  register,
  sendForgotPasswordEmail
} from "./connectors";
export const resolvers: ResolverMap = {
  Mutation: {
    registerUser: register,
    login,
    logout,
    forgotPasswordChange,
    sendForgotPasswordEmail
  }
};
