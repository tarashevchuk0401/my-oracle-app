import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TaxpayerEntity{
    @PrimaryGeneratedColumn()
    taxpayerId: string

    @Column()
    name: string
}