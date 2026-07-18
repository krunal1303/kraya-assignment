import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, } from '@nestjs/common';
import { MiService } from './mi.service';
import { CreateMiDto } from './dto/create-mi.dto';
import { UpdateMiDto } from './dto/update-mi.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';

@Controller('mi')
export class MiController {
    constructor(private readonly miService: MiService) { }

    @Post()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('MI', 'CREATE')
    create(@Body() dto: CreateMiDto, @Req() req: any) {
        return this.miService.create(dto, req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('MI', 'READ')
    findAll() {
        return this.miService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('MI', 'READ')
    findOne(@Param('id') id: string) {
        return this.miService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('MI', 'UPDATE')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateMiDto,
        @Req() req: any,
    ) {
        return this.miService.updateOne(id, dto, req.user.id);
    }
}