import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditPassportModule } from './audit-passport/audit-passport.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxpayerModule } from './taxpayer/taxpayer.module';
import { TaxpayerEntity } from './taxpayer/dto/taxpayer.entity.dto';
import { AuditPassportEntity } from './audit-passport/dto/audit-passport.dto';
import { TaxpayerService } from './taxpayer/taxpayer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      sid: 'workspace',
      username: 'taras',
      password: 'taras',
      autoLoadEntities: true,
      synchronize: true,
      entities: [TaxpayerEntity, AuditPassportEntity],
    }),
    TaxpayerModule,
    AuditPassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
