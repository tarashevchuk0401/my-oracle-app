import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxpayerEntity } from './dto/taxpayer.entity.dto';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { AuditPassportAuditorsParams } from '../interfaces/audit';
import { OnEvent } from '@nestjs/event-emitter';
import { NewUserEvent } from '../shared/events/new-user.event';

@Injectable()
export class TaxpayerService {
  constructor(
    @InjectRepository(TaxpayerEntity)
    private readonly taxpayerRepository: Repository<TaxpayerEntity>,
  ) {}

  async getAll() {
    return await this.taxpayerRepository.findAndCount();
  }

  async createTaxpayer(name: string) {
    const newTaxpayer = await this.taxpayerRepository.create({
      name,
    });

    this.taxpayerRepository.save(newTaxpayer);
    return newTaxpayer;
  }

  async findTaxpayerById(id: string) {
    return await this.taxpayerRepository.findOneBy({ taxpayerId: id });
  }

  async findTaxpayers(array: string[]) {
    const taxpayers = await this.taxpayerRepository.find({
      where: { taxpayerId: In(array) },
    });
    console.log(taxpayers);

    return taxpayers;
  }

  async getTaxpayersList(params: AuditPassportAuditorsParams, ids: string[]) {
    const taxpayers = await this.taxpayerRepository.find({
      where: { taxpayerId: In(ids) },
      skip: (params.page - 1) * params.pageSize,
      take: params.pageSize,
    });

    return taxpayers;
  }

  async getTaxpayersByAudit(id: string) {}

  async deleteTaxpayer(id: string) {
    const res = await this.taxpayerRepository.delete(id);
    return res;
  }

  @OnEvent('user.created')
  async userCreatedEvent(payload: NewUserEvent) {
    const taxpayers = await this.getAll();
    console.log(taxpayers);
  }
}
