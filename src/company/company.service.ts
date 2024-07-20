import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './dto/company.dto';
import { Repository } from 'typeorm';
import { TaxpayerEntity } from '../taxpayer/dto/taxpayer.entity.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(TaxpayerEntity)
    private readonly taxayerRepository: Repository<TaxpayerEntity>,
  ) {}

  async createCompany(body: { name: string; taxpayerId: string }) {
    const taxpayer = await this.taxayerRepository.findOneBy({
      taxpayerId: body.taxpayerId,
    });

    console.log('TP', taxpayer);
    const company = new CompanyEntity(); // Create a new CompanyEntity instance
    company.name = body.name;
    company.taxpayer = taxpayer; // Set the reference to the fetched taxpayer

    const isSaved = await this.companyRepository.save(company);
    console.log(company);
    return isSaved;
  }

  async getCompanies() {
    return await this.companyRepository.find({
      // relations: {
      //   taxpayer: true,
      // },
    });
  }
}
