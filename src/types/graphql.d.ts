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
    __typename: "Query";
    me: IMe | null;
    group: IGroup | null;
    guide: IGuide | null;
    institution: IInstitution | null;
    player: IPlayer | null;
  }

  interface IGroupOnQueryArguments {
    id: string;
  }

  interface IGuideOnQueryArguments {
    id: string;
  }

  interface IInstitutionOnQueryArguments {
    id: string;
  }

  interface IPlayerOnQueryArguments {
    id: string;
  }

  interface IMe {
    __typename: "Me";
    id: string;
    email: string;
  }

  interface IGroup {
    __typename: "Group";
    id: string;
    name: string;
    active: boolean;
    guide: IGuide;
    createdDate: any;
    updatedDate: any;
  }

  interface IGuide {
    __typename: "Guide";
    id: string;
    user: IUser;
    firstName: string | null;
    lastName: string | null;
    fullname: string | null;
    email: string | null;
    active: boolean;
    createdDate: any;
    updatedDate: any;
  }

  interface IUser {
    __typename: "User";
    id: string;
    externalGuid: string | null;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    email: string;
    accountType: AccountType;
    active: boolean;
    accountLocked: boolean;
    acceptedTos: boolean;
    createDate: any;
    updatedDate: any;
    emailConfirmed: boolean;
    guide: IGuide | null;
    institution: IInstitution | null;
  }

  const enum AccountType {
    USER = "USER",
    ADMIN = "ADMIN"
  }

  interface IInstitution {
    __typename: "Institution";
    id: string;
    name: string;
    active: boolean;
    createdDate: any;
    updatedDate: any;
    users: Array<IUser> | null;
  }

  interface IUsersOnInstitutionArguments {
    id?: string | null;
  }

  interface IPlayer {
    __typename: "Player";
    id: string;
    guide: IGuide;
    group: IGroup | null;
    playerCode: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    active: boolean;
    createdDate: any | null;
    updatedDate: any | null;
    acceptedTos: boolean;
  }

  interface IMutation {
    __typename: "Mutation";
    _empty: boolean | null;
    registerUser: Array<IGraphQLError> | null;
    login: Array<IGraphQLError> | null;
    logout: boolean | null;
    sendForgotPasswordEmail: boolean | null;
    forgotPasswordChange: Array<IGraphQLError> | null;
    createGroup: IGroup | null;
    createGuideFromUser: IGuide | null;
    createInstitution: IInstitution | null;
    createPlayer: IPlayer | null;
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

  interface ICreateGroupOnMutationArguments {
    groupParams: IGroupCreationType;
  }

  interface ICreateGuideFromUserOnMutationArguments {
    userId: string;
  }

  interface ICreateInstitutionOnMutationArguments {
    name: string;
  }

  interface ICreatePlayerOnMutationArguments {
    playerParams: ICreatePlayerType;
  }

  interface IUserRegistrationType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

  interface IGraphQLError {
    __typename: "GraphQLError";
    path: string;
    message: string;
  }

  interface IUserLoginType {
    email: string;
    password: string;
  }

  interface IGroupCreationType {
    name: string;
    guideId: string;
  }

  interface ICreatePlayerType {
    guideId: string;
    groupId?: string | null;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  }
}

// tslint:enable
