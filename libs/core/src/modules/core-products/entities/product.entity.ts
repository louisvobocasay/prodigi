import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '../../../models';
import { transformer } from '../../../utils';

@Entity({ name: 'products' })
export class CoreProductEntity extends CoreBaseEntity<CoreProductEntity> {
  @Column() title: string;
  @Column() code: string;
  @Column() description: string;
  @Column() brandId: number;
  @Column() productTypeId: number;
  @Column({ type: 'float', transformer: transformer }) price: number;
  @Column({ nullable: true }) discount: number;
  @Column({ nullable: true, default: 0 }) viewershipNumber: number;
  @Column({ nullable: true, default: 0 }) quantity: number;
  @Column({ nullable: true, default: true }) isActive: boolean;
}
