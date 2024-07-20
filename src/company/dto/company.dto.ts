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

  @OneToOne(() => TaxpayerEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taxpayer_id' })
  taxpayer: TaxpayerEntity;

  @Column()
  schema: string;

  @Column()
  data: string;
}
