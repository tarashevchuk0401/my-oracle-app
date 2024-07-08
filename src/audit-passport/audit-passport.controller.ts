import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuditPassportServcie } from "./audit-passport.servcie";

@Controller('audit-passport')
export class AuditPassportController {
    constructor(private auditPassportService: AuditPassportServcie){}
    @Get()
    async getAllAP(){
        return await this.auditPassportService.getAll()
    }

    @Get('list')
    async getAPList(@Query() params: {taxpayer: string}){
        return await this.auditPassportService.getList(params)
    }

    @Post()
    async createAP(
        @Body() body : {type: string, taxpayers: string[]}
    ){
        return await this.auditPassportService.createAP(body)
    }
}