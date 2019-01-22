import { Context } from "../../../types/context";
import { Institution } from "../../../entity/Institution";

export const getInstitution = async (
  _: any,
  { id }: { id: string },
  __: Context
) => {
  return await Institution.findOne(id);
};
