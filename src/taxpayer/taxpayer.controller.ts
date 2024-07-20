import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaxpayerService } from './taxpayer.service';

@Controller('taxpayer')
export class TaxpayerController {
  constructor(private taxpayerService: TaxpayerService) {}

  @Get()
  async getTaxpayer() {
    return this.taxpayerService.getAll();
  }

  @Post()
  async createTaxpayer(@Body() body: { name: string }) {
    return this.taxpayerService.createTaxpayer(body.name);
  }

  @Get('dy-audit')
  async getTaxpayersByAudit(id: string) {
    return await this.taxpayerService.getTaxpayersByAudit(id);
  }

  @Delete('/:id')
  async deleteTaxpayer(@Param('id') id: string) {
    return await this.taxpayerService.deleteTaxpayer(id);
  }
}
