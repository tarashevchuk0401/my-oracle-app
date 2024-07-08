import { Body, Controller, Get, Post } from "@nestjs/common";
import { TaxpayerService } from "./taxpayer.service";

@Controller('taxpayer')
export class TaxpayerController {
    constructor(
        private taxpayerService: TaxpayerService
    ){}

    @Get()
    async getTaxpayer(){
        return this.taxpayerService.getAll()
    }

    @Post()
    async createTaxpayer(@Body() body: {name: string}){
        return this.taxpayerService.createTaxpayer(body.name)
    }
//coment 1
//com2
}