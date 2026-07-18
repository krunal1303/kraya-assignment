import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';

@Controller('vendors')
export class VendorsController {
    constructor(private readonly vendorsService: VendorsService) { }

    @Post()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('VENDOR', 'CREATE')
    create(@Body() createVendorDto: CreateVendorDto, @Req() req: any) {
        return this.vendorsService.create(createVendorDto, req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('VENDOR', 'READ')
    findAll() {
        return this.vendorsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('VENDOR', 'READ')
    findOne(@Param('id') id: string) {
        return this.vendorsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('VENDOR', 'UPDATE')
    update(
        @Param('id') id: string,
        @Body() updateVendorDto: UpdateVendorDto,
        @Req() req: any,
    ) {
        return this.vendorsService.updateOne(
            id,
            updateVendorDto,
            req.user.id,
        );
    }
}