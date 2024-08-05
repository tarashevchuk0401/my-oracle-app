import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('one/:id')
  async getCompany(@Param('id') id: string) {
    return await this.companyService.getCompany(id);
  }

  @Get('by-code/:code')
  async getCompanyByName(@Param('code') code: string) {
    return await this.companyService.getCompanyByName(code);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string) {
    return await this.companyService.deleteCompany(id);
  }
}
