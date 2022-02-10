import { Column, Entity, PrimaryColumn } from "typeorm";
import { CoreBaseEntity } from "../../../models";

@Entity({ name: 'brands' })
export class CoreBrandEntity extends CoreBaseEntity<CoreBrandEntity> {
  @PrimaryColumn() code: string;
  @Column() name: string;
  @Column({ nullable: true }) address: string;
  @Column({ nullable: true }) isActive: boolean;
}