import { TaxpayerEntity } from 'src/taxpayer/dto/taxpayer.entity.dto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuditPassportEntity {
  @PrimaryGeneratedColumn()
  auditPassportId: string;

  @Column()
  type: string;

  @ManyToOne(() => TaxpayerEntity, (taxpayer) => taxpayer.auditPassport, {
    eager: true,
  })
  taxpayer: TaxpayerEntity;
}
