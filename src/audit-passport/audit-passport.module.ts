import { Module } from '@nestjs/common';
import { AuditPassportEntity } from './dto/audit-passport.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditPassportServcie } from './audit-passport.servcie';
import { AuditPassportController } from './audit-passport.controller';

@Module({
    imports:[TypeOrmModule.forFeature([AuditPassportEntity])],
    providers:[AuditPassportServcie],
    controllers: [AuditPassportController],
})
export class AuditPassportModule {}
