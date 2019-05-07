import { BaseEntity as typeOrmEntity } from "typeorm";

export class BaseEntity extends typeOrmEntity {
  constructor() {
    super();
  }

  static joinableRelations: Array<string> = [];

  async reload(relations?: Array<string>): Promise<void> {
    const base: any = this.constructor;
    const newestEntity: BaseEntity = await base
      .getRepository()
      .findOneOrFail(base.getId(this), { relations });

    Object.assign(this, newestEntity);
  }

  static filterRelationsFromQueryFields(fields: Array<string>) {
    return this.joinableRelations.filter(relation => fields.includes(relation));
  }
}
