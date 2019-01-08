import { shield } from "graphql-shield";
const merge = require("lodash.merge");
import { Permission } from "../types/permissions";
import { filePath } from "./makeSchema";
import * as fs from "fs";

export const createShield = () => {
  const permissions = loadPermissions();
  const merged = permissions.reduce(
    (prev: Permission, curr: Permission) => {
      return merge(prev, curr);
    },
    {
      Query: {},
      Mutation: {}
    }
  );
  return shield(merged);
};

const rootPermission = {
  Query: {},
  Mutation: {}
};

const loadPermissions = () => {
  const permissionsCollection = [rootPermission];
  const coreFolders: string[] = fs.readdirSync(__dirname + `/../core`);
  const folders: string[] = fs.readdirSync(__dirname + `/../modules`);
  const loadPermissionCB = (core: boolean) => (folder: string) => {
    const { permissions } = require(filePath(folder, "index", core));
    permissionsCollection.push(permissions);
  };
  coreFolders.forEach(loadPermissionCB(true));
  folders.forEach(loadPermissionCB(false));
  return permissionsCollection;
};
