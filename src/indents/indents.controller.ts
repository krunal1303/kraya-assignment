import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, } from '@nestjs/common';
import { IndentsService } from './indents.service';
import { CreateIndentDto } from './dto/create-indent.dto';
import { UpdateIndentDto } from './dto/update-indent.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';

@Controller('indents')
export class IndentsController {
    constructor(private readonly indentsService: IndentsService) { }

    @Post()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('INDENT', 'CREATE')
    create(@Body() dto: CreateIndentDto, @Req() req: any) {
        return this.indentsService.create(dto, req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('INDENT', 'READ')
    findAll() {
        return this.indentsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('INDENT', 'READ')
    findOne(@Param('id') id: string) {
        return this.indentsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('INDENT', 'UPDATE')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateIndentDto,
        @Req() req: any,
    ) {
        return this.indentsService.updateOne(id, dto, req.user.id);
    }
}