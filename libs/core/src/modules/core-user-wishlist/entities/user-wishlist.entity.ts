import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CoreBaseEntity } from '../../../models';

@Entity({ name: 'user_wishlist' })
export class CoreUserWishlistEntity extends CoreBaseEntity<CoreUserWishlistEntity> {
  @PrimaryColumn() productId: number;
  @Column() insertedFromIp: string;
  @Column() insertedFromDevice: string;
  @Column({ default: true }) isActive: boolean;
}
