import { AuditPassportEntity } from 'src/audit-passport/dto/audit-passport.dto';
import { Column, Entity,OneToOne, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TaxpayerEntity{
    @PrimaryGeneratedColumn()
    taxpayerId: string

    @Column()
    name: string

    @OneToMany(() => AuditPassportEntity, (auditPassport) => auditPassport.taxpayer)
    auditPassport: AuditPassportEntity;
}