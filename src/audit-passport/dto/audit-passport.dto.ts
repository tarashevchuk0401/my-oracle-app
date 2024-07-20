import { TaxpayerEntity } from 'src/taxpayer/dto/taxpayer.entity.dto';
import {
  JoinTable,
  Column,
  Entity,
  OneToOne,
  ManyToMany,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AuditPassportEntity {
  @PrimaryGeneratedColumn()
  auditPassportId: string;

  @Column()
  type: string;

  @ManyToMany(() => TaxpayerEntity, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'audit_passport_taxpayer',
    joinColumn: {
      name: 'audit_passport',
      referencedColumnName: 'auditPassportId',
    },
    inverseJoinColumn: { name: 'taxpayer', referencedColumnName: 'taxpayerId' },
  })
  taxpayer: TaxpayerEntity[];

  @ManyToOne(() => TaxpayerEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  responsibleTaxpayer: TaxpayerEntity;
}
