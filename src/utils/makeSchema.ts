import * as fs from "fs";
import { makeExecutableSchema } from "graphql-tools";

/**
 * Reads through the modules directory and loads every module into the schema.
 * Each module must have a schema.root.graphql.ts and a resolvers.root.ts file. These will
 * be loaded into the schema dynamically.
 */
export const makeSchema = () => {
  const root = getRootSchema();
  const resolversCollection = [root.resolvers];
  const typeDefsCollection = [root.typeDefs];
  const coreFolders: string[] = fs.readdirSync(__dirname + `/../core`);
  const moduleFolders: string[] = fs.readdirSync(__dirname + `/../modules`);
  // Curried callback function to import the resolvers and typedefs from
  // the correct module folder
  const importFolderCB = (core: boolean) => (folder: string) => {
    const { resolvers, typeDefs } = require(filePath(folder, "index", core));
    resolversCollection.push(resolvers);
    typeDefsCollection.push(typeDefs);
  };
  coreFolders.forEach(importFolderCB(true));
  if (moduleFolders.length) moduleFolders.forEach(importFolderCB(false));

  return makeExecutableSchema({
    resolvers: resolversCollection,
    typeDefs: typeDefsCollection
  });
};

/**
 * Get the root schema elements and return them as executable schema
 */
const getRootSchema = () => {
  const { typeDefs } = require(__dirname + `/../schema.root.graphql`);
  const { resolvers } = require(__dirname + `/../resolvers.root`);
  return { resolvers, typeDefs };
};

/**
 * Determine the file path of the file to import
 * @param folder
 * @param name
 * @param core
 */
export const filePath = (folder: string, name: string, core: boolean) =>
  __dirname + `/../${core ? "core" : "modules"}/${folder}/${name}`;
