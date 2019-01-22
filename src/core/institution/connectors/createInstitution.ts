import { Context } from "../../../types/context";
import { Institution } from "../../../entity/Institution";

export const createInstitution = async (
  _: any,
  { name }: { name: string },
  __: Context
) => {
  return await Institution.create({
    name,
    active: true
  }).save();
};
