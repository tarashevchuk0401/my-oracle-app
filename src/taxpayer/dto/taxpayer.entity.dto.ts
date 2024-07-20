import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CompanyEntity } from '../../company/dto/company.dto';

@Entity()
export class TaxpayerEntity {
  @PrimaryGeneratedColumn()
  taxpayerId: string;

  @Column()
  name: string;

  @OneToOne(() => CompanyEntity)
  company: CompanyEntity;
}
