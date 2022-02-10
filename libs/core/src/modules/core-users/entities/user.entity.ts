import { Column, Entity, PrimaryColumn } from "typeorm";
import { CoreBaseEntity } from "../../../models";
import { CoreEUsersGroups } from "../enum";

@Entity({ name: 'users' })
export class CoreUserEntity extends CoreBaseEntity<CoreUserEntity>{

  @PrimaryColumn()
  username: string;
  @PrimaryColumn()
  email: string;
  @Column({ nullable: true })
  firstname: string;
  @Column({ nullable: true })
  lastname: string;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  dob: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column()
  passwordHashed: string;
  @Column()
  passwordHashedSalt: string;
  @Column({ nullable: true })
  lastLoggedInAt: Date;
  @Column({ nullable: true })
  lastLoggedInFromIp: string;
  @Column({ nullable: true })
  lastLoggedInDevice: string;

  @Column({ enum: CoreEUsersGroups, default: CoreEUsersGroups.USER, nullable: true })
  group: CoreEUsersGroups;
}