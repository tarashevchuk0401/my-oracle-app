import { Module } from '@nestjs/common';
import { AuditPassportEntity } from './dto/audit-passport.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditPassportServcie } from './audit-passport.servcie';
import { AuditPassportController } from './audit-passport.controller';
import { TaxpayerService } from 'src/taxpayer/taxpayer.service';
import { TaxpayerModule } from 'src/taxpayer/taxpayer.module';
import { TaxpayerEntity } from 'src/taxpayer/dto/taxpayer.entity.dto';

@Module({
    imports:[TypeOrmModule.forFeature([AuditPassportEntity]), TaxpayerModule],
    providers:[AuditPassportServcie],
    controllers: [AuditPassportController],
})
export class AuditPassportModule {}
