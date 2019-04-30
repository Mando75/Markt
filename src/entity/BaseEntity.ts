import { BaseEntity as typeOrmEntity } from "typeorm";
import { ObjectUtils } from "typeorm/util/ObjectUtils";

export class BaseEntity extends typeOrmEntity {
  constructor() {
    super();
  }

  async reload(relations?: Array<string>): Promise<void> {
    const base: any = this.constructor;
    const newestEntity: BaseEntity = await base
      .getRepository()
      .findOneOrFail(base.getId(this), { relations });

    ObjectUtils.assign(this, newestEntity);
  }
}
