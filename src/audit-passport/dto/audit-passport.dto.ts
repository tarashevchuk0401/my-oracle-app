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
  })
  @JoinTable({
    name: 'test_table',
    joinColumn: { name: 'audit_passport_entity', referencedColumnName: 'auditPassportId' },
    inverseJoinColumn: { name: 'taxpayer_entity', referencedColumnName: 'taxpayerId' },
  })
  taxpayer: TaxpayerEntity[];
}
