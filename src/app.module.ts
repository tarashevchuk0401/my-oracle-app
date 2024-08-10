import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditPassportModule } from './audit-passport/audit-passport.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxpayerModule } from './taxpayer/taxpayer.module';
import { TaxpayerEntity } from './taxpayer/dto/taxpayer.entity.dto';
import { AuditPassportEntity } from './audit-passport/dto/audit-passport.dto';
import { CompanyEntity } from './company/dto/company.dto';
import { CompanyModule } from './company/company.module';
import { User } from './user/dto/user.entity';
import { UserModule } from './user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      sid: 'workspace',
      username: 'taras',
      password: 'taras',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      entities: [TaxpayerEntity, AuditPassportEntity, User, CompanyEntity],
    }),
    TaxpayerModule,
    AuditPassportModule,
    CompanyModule,
    UserModule,
    MinioClientModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
