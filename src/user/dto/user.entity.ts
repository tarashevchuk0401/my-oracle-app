import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity('users')
export class User extends BaseEntity {
  @Column()
  isDeleted: boolean;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createDateTime: Date;

  @Column()
  createUserId: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column()
  username: string;

  @Column({
    nullable: false,
    name: 'password',
    select: false,
  })
  password: string;
}
