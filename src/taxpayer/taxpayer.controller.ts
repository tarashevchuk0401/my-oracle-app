import { Body, Controller, Get, Post } from "@nestjs/common";
import { TaxpayerService } from "./taxpayer.service";

@Controller('taxpayer-conflict')
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
        // console.log(body)
        return this.taxpayerService.createTaxpayer(body.name)
    }

    //This is comment from MAIn BRANCH
}