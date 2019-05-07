import { BaseEntity as typeOrmEntity, ObjectType } from "typeorm";
import { ObjectUtils } from "typeorm/util/ObjectUtils";
import * as DataLoader from "dataloader";

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

  static getDataloader<T extends BaseEntity>(
    this: ObjectType<T>,
    options?: DataLoader.Options<string, T>
  ): DataLoader<string, T> {
    const batch = async (entityIds: string[]) => {
      return (this as any).getRepository().findByIds(entityIds);
    };
    return new DataLoader(batch, options);
  }
}
