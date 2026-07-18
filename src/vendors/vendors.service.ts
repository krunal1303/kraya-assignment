import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(private readonly prisma: PrismaService) { }

    // Create Vendor
    async create(createVendorDto: CreateVendorDto, userId: string) {
        const existingVendor = await this.prisma.vendor.findFirst({
            where: {
                OR: [
                    { vendorId: createVendorDto.vendorId },
                    { vendorCode: createVendorDto.vendorCode },
                ],
            },
        });

        if (existingVendor) throw new ConflictException('Vendor ID or Vendor Code already exists')

        return this.prisma.vendor.create({
            data: {
                ...createVendorDto,
                createdByUserId: userId,
                lastUpdatedByUserId: userId,
            },
        });
    }


    // Get All Vendors
    async findAll() {
        return this.prisma.vendor.findMany({
            include: {
                createdByUser: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                lastUpdatedByUser: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }


    // Get Single Vendor
    async findOne(id: string) {
        const vendor = await this.prisma.vendor.findUnique({
            where: { id },
            include: {
                createdByUser: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                lastUpdatedByUser: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!vendor) throw new NotFoundException('Vendor not found');

        return vendor;
    }


    // Update Vendor
    async updateOne(id: string, updateVendorDto: UpdateVendorDto, userId: string,) {

        const vendor = await this.prisma.vendor.findUnique({
            where: { id },
        });

        if (!vendor) throw new NotFoundException('Vendor not found');


        if (updateVendorDto.vendorId || updateVendorDto.vendorCode) {
            const existingVendor = await this.prisma.vendor.findFirst({
                where: {
                    AND: [
                        {
                            OR: [
                                { vendorId: updateVendorDto.vendorId },
                                { vendorCode: updateVendorDto.vendorCode },
                            ],
                        },
                        {
                            id: {
                                not: id,
                            },
                        },
                    ],
                },
            });

            if (existingVendor) throw new ConflictException('Vendor ID or Vendor Code already exists',);

        }

        return this.prisma.vendor.update({
            where: { id },
            data: {
                ...updateVendorDto,
                lastUpdatedByUserId: userId,
            },
        });
    }
}