# Markt

## Description

Markt seeks to develop a simple but powerful educational tool for students studying economics. MARKT allows instructors to craft and run mini-market experiments with their students. With real-time transaction tracking and analysis, instructors are well equipped to provide students with an interactive demonstration of how economic theory can predict outcomes of market performance.
This project is currently being developed by University students at BYU-Idaho. While still in the planning phases, we plan to begin working on the base structure within the coming months.

## Install Instructions

1.  Make sure you have Postgresql and Redis installed on your local machine.

2.  Fork or clone the repository

3.  Create an ormconfig.json file configured with your database connections

4.  Make sure you have the following keys present in an `.env` file or as environmental variables

    - `SENDGRID_API_KEY` (for sending emails)
    - `CODACY_PROJECT_TOKEN` (if you want to report testing coverage on a forked repo)
    - `SESSION_SECRET` (Used to secure session cookies)
    - `(TEST_)HOST` (your local (testing) host, i.e. `http://localhost:4000`)
    - `GOOGLE_CLIENT_ID` your Google OAuth Client ID
    - `GOOGLE_CLIENT_SECRET` your Google OAuth Client Secret
    - `GOOGLE_AUTH_CALLBACK_URL` your application's OAuth callback url for Google to use

5.  Run `yarn setup-dev`

## Modules

The schema is divided into separate modules with the idea of being able to easily expand and add new modules to the overall system without needing to rewrite core functionality. All base system modules (such as authentication) can be found in the `src/core`. These core modules provide functionality which new modules can reliably use. New modules can be structured however you like, but must have a top level folder (e.g. `example-module`) with an `index` file which exports `{ resolvers, typeDefs, permissions }`.

### Resolvers

A GraphQL resolver map which corresponds to the exported typeDefs

### typeDefs

The GraphQL type definitions for the new module. Any additions to the top level or core fields like `Query` and `Mutation` should extend the existing field like so: `extend type Query {}`

### Permissions

the GraphQL Shield permissions set for the new module. This should be an object matching the exported resolver map. A core set of rules can be found in `src/rules` which can be imported by any modules permission set, or custom rules can be created. For more information on permission syntax, see the GraphQLShield documentation.

## Authors

* **Bryan Muller** - *Backend Developer*
* **Adam Gehring** - *Frontend Developer*