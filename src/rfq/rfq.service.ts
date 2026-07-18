import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRFQDto } from './dto/create-rfq.dto';
import { UpdateRFQDto } from './dto/update-rfq.dto';

@Injectable()
export class RfqService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateRFQDto, userId: string) {
        const existingRFQ = await this.prisma.rFQ.findFirst({
            where: {
                OR: [
                    { rfqId: dto.rfqId },
                    { rfqCode: dto.rfqCode },
                ],
            },
        });

        if (existingRFQ) throw new ConflictException('RFQ ID or Code already exists')

        // Validate Items & Vendors
        for (const rfqItem of dto.items) {
            const item = await this.prisma.item.findUnique({
                where: { id: rfqItem.itemId },
            });

            if (!item) throw new NotFoundException(`Item ${rfqItem.itemId} not found`,);

            const vendor = await this.prisma.vendor.findUnique({
                where: { id: rfqItem.vendorId },
            });

            if (!vendor) throw new NotFoundException(`Vendor ${rfqItem.vendorId} not found`)
        }

        const rFQ = await this.prisma.rFQ.create({
            data: {
                rfqId: dto.rfqId,
                companyId: dto.companyId,
                rfqCode: dto.rfqCode,
                description: dto.description,
                createdByUserId: userId,
                lastUpdatedByUserId: userId,
            },
        });

        for (const rfqItem of dto.items) {
            await this.prisma.rFQItem.create({
                data: {
                    rfqId: rFQ.id,
                    itemId: rfqItem.itemId,
                    vendorId: rfqItem.vendorId,
                    quantity: rfqItem.quantity,
                    price: rfqItem.price
                },
            });

            await this.prisma.item.update({
                where: { id: rfqItem.itemId },
                data: { isLocked: true }
            });
        }

        return this.findOne(rFQ.id);
    }

    async findAll() {
        return this.prisma.rFQ.findMany({
            include: {
                rfqItems: {
                    include: { item: true, vendor: true, }
                },
                createdByUser: {
                    select: { id: true, name: true, }
                },
                lastUpdatedByUser: {
                    select: { id: true, name: true, }
                },
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findOne(id: string) {
        const rFQ = await this.prisma.rFQ.findUnique({
            where: { id },
            include: {
                rfqItems: {
                    include: {
                        item: true,
                        vendor: true,
                    },
                },
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

        if (!rFQ) {
            throw new NotFoundException('RFQ not found');
        }

        return rFQ;
    }

    async updateOne(id: string, dto: UpdateRFQDto, userId: string) {
        const rFQ = await this.prisma.rFQ.findUnique({
            where: { id },
        });

        if (!rFQ) {
            throw new NotFoundException('RFQ not found');
        }

        if (dto.rfqId || dto.rfqCode) {
            const existingRFQ = await this.prisma.rFQ.findFirst({
                where: {
                    AND: [
                        {
                            OR: [
                                { rfqId: dto.rfqId },
                                { rfqCode: dto.rfqCode },
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

            if (existingRFQ) {
                throw new ConflictException(
                    'RFQ ID or Code already exists',
                );
            }
        }

        return this.prisma.rFQ.update({
            where: { id },
            data: {
                rfqId: dto.rfqId,
                companyId: dto.companyId,
                rfqCode: dto.rfqCode,
                description: dto.description,
                lastUpdatedByUserId: userId,
            },
        });
    }
}