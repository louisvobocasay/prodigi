import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CoreIdentifyEntity<T = {}> {
  /**
   *
   */
  constructor(partial?: Partial<T>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;
}

export class CoreBaseEntity<T = unknown> extends CoreIdentifyEntity<T> {
  /**
   *
   */
  constructor(partial?: Partial<T>) {
    super(partial);
  }

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn({ nullable: true }) updatedAt: Date;

  @Column({ nullable: true }) createdBy: number;
  @Column({ nullable: true }) updatedBy: number;
}
