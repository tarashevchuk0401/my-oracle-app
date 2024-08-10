import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  taxpayerId: string;
}
