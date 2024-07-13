import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxpayerEntity } from './dto/taxpayer.entity.dto';
import { Repository, Like } from 'typeorm';
import { In } from 'typeorm';

@Injectable()
export class TaxpayerService {
  constructor(
    @InjectRepository(TaxpayerEntity)
    private readonly taxpayerRepository: Repository<TaxpayerEntity>,
  ) {}

  async getAll() {
    return await this.taxpayerRepository.findAndCount();
  }

  async createTaxpayer(name: string, surname: string, country: string) {
    const newTaxpayer = await this.taxpayerRepository.create({
      name,
      surname,
      country,
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

  async getWithFilter(searchTerm: string, country: string) {
    const basciFilter = {
      ...(country ? { country: Like(`%${country}%`) } : {}),
    };

    if (searchTerm) {
      const result = await this.taxpayerRepository.find({
        where: [
          { surname: Like(`%${searchTerm}%`), ...basciFilter },
          { name: Like(`%${searchTerm}%`), ...basciFilter },
        ],
      });
      return result;
    } else {
      const result = await this.taxpayerRepository.find({
        where: basciFilter,
      });

      return result;
      // text from relations branch
    }
  }
}
