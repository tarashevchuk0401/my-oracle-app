import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './dto/company.dto';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TaxpayerEntity } from '../taxpayer/dto/taxpayer.entity.dto';
import { TaxpayerModule } from '../taxpayer/taxpayer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, TaxpayerEntity]),
    TaxpayerModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
