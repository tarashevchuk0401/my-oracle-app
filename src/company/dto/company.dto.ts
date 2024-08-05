import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaxpayerEntity } from '../../taxpayer/dto/taxpayer.entity.dto';

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  companyId: string;

  @Column()
  name: string;

  @OneToOne(
    () => TaxpayerEntity,
    (company: TaxpayerEntity) => company.taxpayerId,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'taxpayer_id' })
  taxpayer: TaxpayerEntity;

  @Column({ nullable: true })
  schema: string;

  @Column({ nullable: true })
  data: string;
}
