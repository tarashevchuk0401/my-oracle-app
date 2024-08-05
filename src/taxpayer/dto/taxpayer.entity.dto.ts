import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from '../../company/dto/company.dto';
import { AuditPassportEntity } from '../../audit-passport/dto/audit-passport.dto';

@Entity()
export class TaxpayerEntity {
  @PrimaryGeneratedColumn()
  taxpayerId: string;

  @Column()
  name: string;

  @OneToMany(
    () => AuditPassportEntity,
    (auditPassport) => auditPassport.responsibleTaxpayer,
  )
  audit: AuditPassportEntity;

  @OneToOne(() => CompanyEntity, (company) => company.taxpayer, {
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;
}
