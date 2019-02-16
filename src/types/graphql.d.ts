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
    experiment: IExperiment | null;
    group: IGroup | null;
    guide: IGuide | null;
    institution: IInstitution | null;
    player: IPlayer | null;
    scenario: IScenario | null;
    roleType: IRoleType | null;
    scenarioSession: IScenarioSession | null;
    sessionRole: ISessionRole | null;
  }

  interface IExperimentOnQueryArguments {
    id: string;
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

  interface IScenarioOnQueryArguments {
    id: string;
  }

  interface IRoleTypeOnQueryArguments {
    id: string;
  }

  interface IScenarioSessionOnQueryArguments {
    id: string;
  }

  interface ISessionRoleOnQueryArguments {
    id: string;
  }

  interface IMe {
    __typename: 'Me';
    id: string;
    email: string;
  }

  interface IExperiment {
    __typename: 'Experiment';
    id: string;
    guide: IGuide;
    scenario: IScenario;
    group: IGroup;
    joinCode: string;
    numPlayers: number;
    active: boolean;
    endDate: any | null;
    createdDate: any | null;
    updatedDate: any | null;
  }

  interface IGuide {
    __typename: 'Guide';
    id: string;
    user: IUser;
    firstName: string | null;
    lastName: string | null;
    fullname: string | null;
    email: string | null;
    experiments: Array<IExperiment | null> | null;
    active: boolean;
    createdDate: any;
    updatedDate: any;
  }

  interface IUser {
    __typename: 'User';
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
    USER = 'USER',
    ADMIN = 'ADMIN'
  }

  interface IInstitution {
    __typename: 'Institution';
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

  interface IScenario {
    __typename: 'Scenario';
    id: string;
    name: string;
    scenarioCode: string;
    maxPlayerSize: number;
    sessionCount: number;
    overview: Array<IScenarioSessionOverview | null> | null;
    description: string | null;
    instructions: Array<IInstructions | null> | null;
    roleDistribution: Array<string | null> | null;
    roleTypes: Array<IRoleType | null> | null;
    scenarioSessions: Array<IScenarioSession | null> | null;
    experiments: Array<IExperiment | null> | null;
    createdDate: any;
    updatedDate: any;
  }

  interface IScenarioSessionOverview {
    __typename: 'ScenarioSessionOverview';
    sessionNumber: number | null;
    roleDescription: Array<IScenarioOverviewRoleDescription | null> | null;
    chartPoints: Array<Array<Array<number | null> | null> | null> | null;
    expectations: string | null;
  }

  interface IScenarioOverviewRoleDescription {
    __typename: 'ScenarioOverviewRoleDescription';
    description: string | null;
    count: number | null;
  }

  interface IInstructions {
    __typename: 'Instructions';
    step: number | null;
    header: string | null;
    bullets: Array<IInstructionBullet | null> | null;
  }

  interface IInstructionBullet {
    __typename: 'InstructionBullet';
    format: InstructionBulletFormat | null;
    text: string | null;
  }

  const enum InstructionBulletFormat {
    BOLD = 'BOLD',
    ITALIC = 'ITALIC',
    NORMAL = 'NORMAL',
    UNDERLINE = 'UNDERLINE'
  }

  interface IRoleType {
    __typename: 'RoleType';
    id: string;
    scenario: IScenario;
    roleTypeId: string;
    name: string | null;
    sessionRoles: Array<ISessionRole | null> | null;
    createdDate: any;
    updatedDate: any;
  }

  interface ISessionRole {
    __typename: 'SessionRole';
    id: string;
    roleType: IRoleType;
    scenarioSession: IScenarioSession;
    sessionNumber: number;
    name: string | null;
    value: number;
    allowSell: boolean;
    instructions: Array<IInstructions | null> | null;
    profitEquation: string;
    createdDate: any;
    updatedDate: any;
  }

  interface IScenarioSession {
    __typename: 'ScenarioSession';
    id: string;
    scenario: IScenario;
    scenarioSessionId: string;
    sessionNumber: number | null;
    instructions: Array<IInstructions | null> | null;
    roundDiscussionPoints: Array<IInstructions | null> | null;
    numberOfRounds: number | null;
    sessionRoles: Array<ISessionRole | null> | null;
    createdDate: any;
    updatedDate: any;
  }

  interface IGroup {
    __typename: 'Group';
    id: string;
    name: string;
    active: boolean;
    guide: IGuide;
    experiments: Array<IExperiment | null> | null;
    createdDate: any;
    updatedDate: any;
  }

  interface IPlayer {
    __typename: 'Player';
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
    __typename: 'Mutation';
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
    __typename: 'GraphQLError';
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
