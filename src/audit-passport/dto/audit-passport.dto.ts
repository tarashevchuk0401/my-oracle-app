import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class AuditPassportEntity{
    @PrimaryGeneratedColumn()
    auditPassportId: string

    @Column()
    type: string
}