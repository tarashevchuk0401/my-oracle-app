import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaxpayerEntity } from "./dto/taxpayer.entity.dto";
import { Repository } from 'typeorm';


@Injectable()
export class TaxpayerService {
    constructor(
        @InjectRepository(TaxpayerEntity)
        private readonly taxpayerRepository: Repository<TaxpayerEntity>
    ){}

    async createTaxpayer(name : string){
        const newTaxpayer = await this.taxpayerRepository.create({
            name
        }) 

        this.taxpayerRepository.save(newTaxpayer)
        return newTaxpayer
    }
}