import { AuditPassportEntity } from 'src/audit-passport/dto/audit-passport.dto';
import { Column, Entity,OneToOne, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TaxpayerEntity{
    @PrimaryGeneratedColumn()
    taxpayerId: string

    @Column()
    name: string

    @Column()
    country: string

    @Column()
    surname: string
}