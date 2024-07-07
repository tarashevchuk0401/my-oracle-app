import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuditPassportServcie } from "./audit-passport.servcie";

@Controller('audit-passport')
export class AuditPassportController {
    constructor(private auditPassportService: AuditPassportServcie){}
    @Get()
    async getAllAP(){
        return await this.auditPassportService.getAll()
    }

    @Post()
    async createAP(
        @Body() body : {type: string}
    ){
        return await this.auditPassportService.createAP(body.type)
    }
}