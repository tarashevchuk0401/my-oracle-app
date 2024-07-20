import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditPassportEntity } from './dto/audit-passport.dto';
import { Repository, In } from 'typeorm';
import { TaxpayerService } from 'src/taxpayer/taxpayer.service';
import { AuditPassportAuditorsParams } from '../interfaces/audit';
import { TaxpayerEntity } from '../taxpayer/dto/taxpayer.entity.dto';

@Injectable()
export class AuditPassportServcie {
  constructor(
    @InjectRepository(AuditPassportEntity)
    private readonly auditPassportRepository: Repository<AuditPassportEntity>,
    @InjectRepository(TaxpayerEntity)
    private readonly taxpayerRepository: Repository<TaxpayerEntity>,
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

  async createAP(body: {
    type: string;
    taxpayers: string[];
    responsibleTaxpayerId: string;
  }) {
    const allTaxpayers = await this.taxpayerService.findTaxpayers(
      body.taxpayers,
    );

    const responsibleTaxpayer = await this.taxpayerService.findTaxpayerById(
      body.responsibleTaxpayerId,
    );

    const newAP = this.auditPassportRepository.create({
      ...body,
      taxpayer: allTaxpayers,
      responsibleTaxpayer: responsibleTaxpayer,
    });
    console.log('AP', newAP);
    await this.auditPassportRepository.save(newAP);
    return newAP;
  }

  async getAuditTaxpayers(params: AuditPassportAuditorsParams) {
    const ids = ['1', '2', '3', '4', '5'];

    const taxpayers = await this.taxpayerService.getTaxpayersList(params, ids);
    return taxpayers;
  }

  async deleteTaxpayerFromPassport() {
    const passport = await this.auditPassportRepository.findOneBy({
      auditPassportId: '1',
    });
    console.log(passport);

    const newTaxpayer = await this.taxpayerService.findTaxpayerById('1');

    passport.taxpayer = [];

    await this.auditPassportRepository.save(passport);
    return 'done';
  }

  async getTaxpayersByAuditPassportId(auditPassportId: string) {
    const auditPassport = await this.auditPassportRepository.findOne({
      where: { auditPassportId },
      relations: ['taxpayer'],
    });

    if (!auditPassport) {
      throw new NotFoundException(
        `Audit passport with id: ${auditPassportId} not found`,
      );
    }
    const taxpayers = auditPassport.taxpayer.map((i) => i.taxpayerId);

    const [data, total] = await this.taxpayerRepository.findAndCount({
      where: { taxpayerId: In(taxpayers) },
    });

    return [data, total];
  }
}
