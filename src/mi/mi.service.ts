import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMiDto } from './dto/create-mi.dto';
import { UpdateMiDto } from './dto/update-mi.dto';

@Injectable()
export class MiService {
    constructor(private readonly prisma: PrismaService) { }

    // Create MI
    async create(dto: CreateMiDto, userId: string) {
        const existingMi = await this.prisma.mI.findFirst({
            where: {
                OR: [
                    { miId: dto.miId },
                    { miCode: dto.miCode },
                ],
            },
        });

        if (existingMi) throw new ConflictException('MI ID or Code already exists')

        // Validate Items
        for (const item of dto.items) {
            const existingItem = await this.prisma.item.findUnique({
                where: { id: item.itemId }
            });

            if (!existingItem) throw new NotFoundException(`Item ${item.itemId} not found`)
        }

        const mi = await this.prisma.mI.create({
            data: {
                miId: dto.miId,
                companyId: dto.companyId,
                miCode: dto.miCode,
                description: dto.description,
                createdByUserId: userId,
                lastUpdatedByUserId: userId,
            },
        });

        for (const item of dto.items) {
            await this.prisma.mIItem.create({
                data: {
                    miId: mi.id,
                    itemId: item.itemId,
                    quantity: item.quantity,
                },
            });

            await this.prisma.item.update({
                where: { id: item.itemId },
                data: { isLocked: true }
            });
        }
        return this.findOne(mi.id);
    }

    // Get All MI
    async findAll() {
        return this.prisma.mI.findMany({
            include: {
                miItems: { include: { item: true } },
                createdByUser: {
                    select: { id: true, name: true }
                },
                lastUpdatedByUser: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    // Get Single MI
    async findOne(id: string) {
        const mi = await this.prisma.mI.findUnique({
            where: { id },
            include: {
                miItems: {
                    include: {
                        item: true,
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

        if (!mi) {
            throw new NotFoundException('MI not found');
        }

        return mi;
    }

    // Update MI
    async updateOne(id: string, dto: UpdateMiDto, userId: string) {
        const mi = await this.prisma.mI.findUnique({
            where: { id },
        });

        if (!mi) {
            throw new NotFoundException('MI not found');
        }

        if (dto.miId || dto.miCode) {
            const existingMi = await this.prisma.mI.findFirst({
                where: {
                    AND: [
                        {
                            OR: [
                                { miId: dto.miId },
                                { miCode: dto.miCode },
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

            if (existingMi) {
                throw new ConflictException('MI ID or Code already exists');
            }
        }

        return this.prisma.mI.update({
            where: { id },
            data: {
                miId: dto.miId,
                companyId: dto.companyId,
                miCode: dto.miCode,
                description: dto.description,
                lastUpdatedByUserId: userId,
            },
        });
    }
}