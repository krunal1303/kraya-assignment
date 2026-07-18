import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, } from '@nestjs/common';
import { RfqService } from './rfq.service';
import { CreateRFQDto } from './dto/create-rfq.dto';
import { UpdateRFQDto } from './dto/update-rfq.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';

@Controller('rfq')
export class RfqController {
    constructor(private readonly rfqService: RfqService) { }

    @Post()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('RFQ', 'CREATE')
    create(@Body() dto: CreateRFQDto, @Req() req: any) {
        return this.rfqService.create(dto, req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('RFQ', 'READ')
    findAll() {
        return this.rfqService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('RFQ', 'READ')
    findOne(@Param('id') id: string) {
        return this.rfqService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('RFQ', 'UPDATE')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateRFQDto,
        @Req() req: any,
    ) {
        return this.rfqService.updateOne(id, dto, req.user.id);
    }
}