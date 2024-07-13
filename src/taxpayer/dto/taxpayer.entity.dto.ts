import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaxpayerEntity {
  @PrimaryGeneratedColumn()
  taxpayerId: string;

  @Column()
  name: string;

  // @OneToMany(() => AuditPassportEntity, (auditPassport) => auditPassport.taxpayer)
  // auditPassport: AuditPassportEntity;
}
