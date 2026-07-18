import { ConflictException, Injectable, NotFoundException, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(private readonly prisma: PrismaService) { }

    // Create Item
    async create(createItemDto: CreateItemDto, userId: string) {
        const existingItem = await this.prisma.item.findFirst({
            where: {
                OR: [
                    { itemId: createItemDto.itemId },
                    { itemCode: createItemDto.itemCode }
                ],
            },
        });

        if (existingItem) throw new ConflictException('Item ID or Item Code already exists')

        return this.prisma.item.create({
            data: {
                ...createItemDto,
                createdByUserId: userId,
                lastUpdatedByUserId: userId
            },
        });
    }

    // Get All Items
    async findAll() {
        return this.prisma.item.findMany({
            include: {
                createdByUser: {
                    select: {
                        id: true,
                        name: true
                    },
                },
                lastUpdatedByUser: {
                    select: {
                        id: true,
                        name: true
                    },
                },
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    // Get Single Item
    async findOne(id: string) {
        const item = await this.prisma.item.findUnique({
            where: { id },
            include: {
                createdByUser: true,
                lastUpdatedByUser: true
            },
        });

        if (!item) throw new NotFoundException('Item not found')

        return item;
    }

    // Update Item
    async updateOne(id: string, updateItemDto: UpdateItemDto, userId: string) {

        const item = await this.prisma.item.findUnique({
            where: { id }
        });

        if (!item) throw new NotFoundException('Item not found');

        if (item.isLocked) throw new ForbiddenException('Item is locked and cannot be updated')

        if (updateItemDto.itemId || updateItemDto.itemCode) {
            const existingItem = await this.prisma.item.findFirst({
                where: {
                    AND: [
                        {
                            OR: [
                                { itemId: updateItemDto.itemId },
                                { itemCode: updateItemDto.itemCode },
                            ]
                        },
                        {
                            id: {
                                not: id
                            }
                        }
                    ]
                }
            });

            if (existingItem) throw new ConflictException('Item ID or Item Code already exists')
        }

        const updatedItem = await this.prisma.item.update({
            where: { id },
            data: {
                ...updateItemDto,
                lastUpdatedByUserId: userId,
            },
        });

        return updatedItem;
    }
}