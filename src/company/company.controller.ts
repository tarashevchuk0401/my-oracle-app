import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() body: { name: string; taxpayerId: string }) {
    return await this.companyService.createCompany(body);
  }

  @Get()
  async getCompanies() {
    return await this.companyService.getCompanies();
  }
}
