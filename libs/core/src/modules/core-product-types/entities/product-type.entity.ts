import { Column, Entity, PrimaryColumn } from "typeorm";
import { CoreBaseEntity } from "../../../models";

@Entity({ name: 'product_types' })
export class CoreProductTypeEntity extends CoreBaseEntity<CoreProductTypeEntity> {
  @PrimaryColumn() code: string;
  @Column() name: string;
  @Column({ nullable: true }) isActive: boolean;
}