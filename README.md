# GraphQL Server boilerplate

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5f37e282e69c47dd859b1c35fc00afea)](https://www.codacy.com/app/Mando75/graphql-server-boilerplate?utm_source=github.com&utm_medium=referral&utm_content=Mando75/graphql-server-boilerplate&utm_campaign=Badge_Grade)

Boilerplate code for an Apollo Server with Typescript, TypeORM, Jest, Postgresql, Redis, and SendGrid.

## Description

This project provides a boilerplate codebase for building scalable and modular GraphQL APIs with Apollo Server. The boilerplate includes these features (which can be removed if desired)

- Basic user registration
- User registration through 3rd party OAuth providers
- Account email verification
- Login and session handling

GraphQL is self documenting, so for a full reference of the provided API, clone the project and run it locally with GraphQLPlayground (provided with the repo).

## Install Instructions

1.  Make sure you have Postgresql and Redis installed on your local machine.

2.  Fork or clone the repository

3.  Run `yarn install`

4.  Make sure you have the following keys present in an `.env` file or as environmental variables

    - `SENDGRID_API_KEY` (for sending emails)
    - `CODACY_PROJECT_TOKEN` (if you want to report testing coverage on a forked repo)
    - `SESSION_SECRET` (Used to secure session cookies)
    - `(TEST_)HOST` (your local (testing) host, i.e. `http://localhost:4000`)
    - `GOOGLE_CLIENT_ID` your Google OAuth Client ID
    - `GOOGLE_CLIENT_SECRET` your Google OAuth Client Secret
    - `GOOGLE_AUTH_CALLBACK_URL` your application's OAuth callback url for Google to use

5.  Run `yarn build && yarn start` (see `package.json` for additional scripts)

## Modules

The schema is divided into separate modules with the idea of being able to easily expand and add new modules to the overall system without needing to rewrite core functionality. All base system modules (such as authentication) can be found in the `src/core`. These core modules provide functionality which new modules can reliably use. New modules can be structured however you like, but must have a top level folder (e.g. `example-module`) with an `index` file which exports `{ resolvers, typeDefs, permissions }`.

### Resolvers

A GraphQL resolver map which corresponds to the exported typeDefs

### typeDefs

The GraphQL type definitions for the new module. Any additions to the top level or core fields like `Query` and `Mutation` should extend the existing field like so: `extend type Query {}`

### Permissions

the GraphQL Shield permissions set for the new module. This should be an object matching the exported resolver map. A core set of rules can be found in `src/rules` which can be imported by any modules permission set, or custom rules can be created. For more information on permission syntax, see the GraphQLShield documentation.

## Contributing

This project is not open to direct contributions at the moment, as it is still under heavy development. If you do find an issue or would like to raise a concern, please open an issue and I will address as soon as I can.
