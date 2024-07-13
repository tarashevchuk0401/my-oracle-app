import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
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
    async createTaxpayer(@Body() body: {name: string, surname: string, country: string}){
        return this.taxpayerService.createTaxpayer(body.name, body.surname, body.country)
    }

    @Get('filter')
    async getWithFilter(@Query() params: {searchTerm: string, country: string}){
        return this.taxpayerService.getWithFilter(params.searchTerm, params.country)
    }
//coment 1
//com2
}