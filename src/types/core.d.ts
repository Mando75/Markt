declare module Core {
  interface User {
    id?: string;
    externalGuid?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email: string;
    accountType: AccountType;
    active: boolean;
    accountLocked: boolean;
    acceptedTos: boolean;
    createdDate: Date;
    updatedDate: Date;
    emailConfirmed: boolean;
    institution?: Promise<Institution>;
    guide: Promise<Guide>;
  }

  interface Institution {
    id?: string;
    name: string;
    users?: Promise<User[]>;
    createdDate: Date;
    updatedDate: Date;
  }

  interface Player {
    id?: string;
    guide: Promise<Guide>;
    group: Promise<Group>;
    playerCode: string;
    email: string;
    firstName?: string;
    lastName?: string;
    active: boolean;
    acceptedTos: boolean;
    createdDate: Date;
    updatedDate: Date;
  }

  interface Guide {
    id?: string;
    user: Promise<User>;
    groups: Promise<Group[]>;
    players: Promise<Player[]>;
    experiments: Promise<ExperimentSchema.Experiment[]>;
    active: boolean;
    createdDate: Date;
    updatedDate: Date;
  }
  interface Group {
    id?: string;
    name: string;
    guide: Promise<Guide>;
    players: Promise<Player[]>;
    experiments: Promise<ExperimentSchema.Experiment>;
    createdDate: Date;
    updatedDate: Date;
  }

  enum AccountType {
    ADMIN = "admin",
    USER = "user"
  }
}
