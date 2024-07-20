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
    console.log('Sche', JSON.stringify({ name: 'string', code: 'number' }));
    console.log(
      'Parse',
      JSON.parse(JSON.stringify({ name: 'string', code: 'number' })),
    );
    const taxpayer = await this.taxayerRepository.findOneBy({
      taxpayerId: body.taxpayerId,
    });
    const company = new CompanyEntity(); // Create a new CompanyEntity instance
    company.name = body.name;
    company.taxpayer = taxpayer;

    company.schema = JSON.stringify({ name: 'string', code: 'string' });
    company.data = JSON.stringify({ name: body.name, code: body.taxpayerId });
    const isSaved = await this.companyRepository.save(company);
    console.log(company);
    return isSaved;
  }

  async getCompanies() {
    const company = await this.companyRepository.find();

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
}
