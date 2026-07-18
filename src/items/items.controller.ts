import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { ItemsService } from './items.service';
import { UpdateItemDto } from './dto/update-item.dto';
import type { Request } from 'express';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Post()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('ITEM', 'CREATE')
    create(
        @Body() createItemDto: CreateItemDto,
        @Req() req: Request,
    ) {
        return this.itemsService.create(
            createItemDto,
            (req.user as any).id,
        );
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('ITEM', 'READ')
    findAll() {
        return this.itemsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('ITEM', 'READ')
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('ITEM', 'UPDATE')
    update(
        @Param('id') id: string,
        @Body() updateItemDto: UpdateItemDto,
        @Req() req: Request,
    ) {
        return this.itemsService.updateOne(
            id,
            updateItemDto,
            (req.user as any).id,
        );
    }
}