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
    console.log(taxpayer);

    const newCompany = this.companyRepository.create({
      name: body.name,
      taxpayer: taxpayer,
    });
    await this.companyRepository.save(newCompany);
    console.log(newCompany);
    return newCompany;
  }

  async getCompanies() {
    const company = await this.companyRepository.find({
      relations: { taxpayer: true },
    });

    return company;
  }

  async getCompany(id: string) {
    const company = await this.companyRepository.findOne({
      relations: {
        taxpayer: true,
      },
      where: { companyId: id },
    });

    const schema = JSON.parse(company.schema);

    const data = JSON.parse(company.data);
    const name = data.name;
    console.log({ name });
    console.log({ data });
    console.log({ schema });
    return company;
  }

  async getCompanyByName(code: string) {
    return this.companyRepository
      .createQueryBuilder('company')
      .where("json_value(company.data, '$.name') = :name", { name: code })
      .getMany();
  }

  async deleteCompany(id: string) {
    const result = await this.companyRepository.delete(id);
    return result;
  }
}
