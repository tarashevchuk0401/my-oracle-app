import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditPassportEntity } from './dto/audit-passport.dto';
import { Repository } from 'typeorm';


@Injectable()
export class AuditPassportServcie {
    constructor(
        @InjectRepository(AuditPassportEntity)
        private readonly auditPassportRepository: Repository<AuditPassportEntity>
    ){}

  async getAll(){
     return await  this.auditPassportRepository.findAndCount()
  }

  async createAP(type: string){
    const newAP =  this.auditPassportRepository.create({
        type
    })

    await this.auditPassportRepository.save(newAP)
    return newAP
  }
}
