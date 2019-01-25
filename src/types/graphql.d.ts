// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    me: IMe | null;
    institution: IInstitution | null;
  }

  interface IInstitutionOnQueryArguments {
    id: string;
  }

  interface IMe {
    __typename: 'Me';
    id: string;
    email: string;
  }

  interface IInstitution {
    __typename: 'Institution';
    id: string;
    name: string;
    active: boolean;
    createdDate: any;
    updatedDate: any;
  }

  interface IMutation {
    __typename: 'Mutation';
    _empty: boolean | null;
    registerUser: Array<IGraphQLError> | null;
    login: Array<IGraphQLError> | null;
    logout: boolean | null;
    sendForgotPasswordEmail: boolean | null;
    forgotPasswordChange: Array<IGraphQLError> | null;
    createInstitution: IInstitution | null;
  }

  interface IRegisterUserOnMutationArguments {
    user?: IUserRegistrationType | null;
  }

  interface ILoginOnMutationArguments {
    user?: IUserLoginType | null;
  }

  interface ISendForgotPasswordEmailOnMutationArguments {
    email: string;
  }

  interface IForgotPasswordChangeOnMutationArguments {
    newPassword: string;
    key: string;
  }

  interface ICreateInstitutionOnMutationArguments {
    name: string;
  }

  interface IUserRegistrationType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

  interface IGraphQLError {
    __typename: 'GraphQLError';
    path: string;
    message: string;
  }

  interface IUserLoginType {
    email: string;
    password: string;
  }
}

// tslint:enable
