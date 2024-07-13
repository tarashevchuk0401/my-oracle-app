import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxpayerEntity } from './dto/taxpayer.entity.dto';
import { Repository } from 'typeorm';

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

  //main
}
