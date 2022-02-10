import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '../../../models';

@Entity({ name: 'medias' })
export class CoreMediaEntity extends CoreBaseEntity<CoreMediaEntity> {
  @Column({ nullable: true }) parentId: number;
  @Column() path: string;
  @Column() name: string;
  @Column() size: number;
  @Column() extension: string;
  @Column({ default: true }) isActive: boolean;
}
