import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditPassportEntity } from './dto/audit-passport.dto';
import { Repository } from 'typeorm';
import { TaxpayerEntity } from 'src/taxpayer/dto/taxpayer.entity.dto';
import { TaxpayerService } from 'src/taxpayer/taxpayer.service';

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

    const taxpayerEntity =
      await this.taxpayerService.findTaxpayerById(taxpayer);

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
}
