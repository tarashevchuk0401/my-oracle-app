import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditPassportEntity } from './dto/audit-passport.dto';
import { Repository } from 'typeorm';
import { TaxpayerService } from 'src/taxpayer/taxpayer.service';
import { AuditPassportAuditorsParams } from '../interfaces/audit';

@Injectable()
export class AuditPassportServcie {
  constructor(
    @InjectRepository(AuditPassportEntity)
    private readonly auditPassportRepository: Repository<AuditPassportEntity>,
    private taxpayerService: TaxpayerService,
  ) {}

  async getAll() {
    return await this.auditPassportRepository.findAndCount();
  }

  async getList(params: { taxpayer: string }) {
    const { taxpayer } = params;

    const list = await this.auditPassportRepository.findAndCount({
      where: {
        taxpayer: { taxpayerId: taxpayer },
      },
    });

    return list;
  }

  async createAP(body: { type: string; taxpayers: string[] }) {
    const allTaxpayers = await this.taxpayerService.findTaxpayers(
      body.taxpayers,
    );

    const newAP = this.auditPassportRepository.create({
      ...body,
      taxpayer: allTaxpayers,
    });

    await this.auditPassportRepository.save(newAP);
    return newAP;
  }

  async getAuditTaxpayers(params: AuditPassportAuditorsParams) {
    // const audit = await this.auditPassportRepository.findOneBy({
    //   auditPassportId: params.auditId,
    // });

    const ids = ['1', '2', '3', '4', '5'];

    const taxpayers = await this.taxpayerService.getTaxpayersList(params, ids);
    return taxpayers;
  }
}
