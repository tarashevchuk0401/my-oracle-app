import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuditPassportServcie } from './audit-passport.servcie';
import { AuditPassportAuditorsParams } from '../interfaces/audit';

@Controller('audit-passport')
export class AuditPassportController {
  constructor(private auditPassportService: AuditPassportServcie) {}
  @Get()
  async getAllAP() {
    return await this.auditPassportService.getAll();
  }

  @Get('list')
  async getAPList(@Query() params: { taxpayer: string }) {
    return await this.auditPassportService.getList(params);
  }

  @Post()
  async createAP(@Body() body: { type: string; taxpayers: string[] }) {
    return await this.auditPassportService.createAP(body);
  }

  @Get('taxpayers/:id')
  async getAuditTaxpayers(@Query() params: AuditPassportAuditorsParams) {
    return await this.auditPassportService.getAuditTaxpayers(params);
  }
}
