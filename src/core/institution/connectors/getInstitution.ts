import { Institution } from "../../../entity/Institution";

export const getInstitution = async (
  _: any,
  { id }: GQL.IInstitutionOnQueryArguments,
  __: any
) => {
  return await Institution.findOne(id);
};
