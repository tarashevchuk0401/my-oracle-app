import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaxpayerEntity } from './dto/taxpayer.entity.dto';
import { TaxpayerController } from './taxpayer.controller';
import { TaxpayerService } from './taxpayer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaxpayerEntity])],
  providers: [TaxpayerService],
  exports: [TaxpayerService],
  controllers: [TaxpayerController],
})
export class TaxpayerModule {}
