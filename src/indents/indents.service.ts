import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIndentDto } from './dto/create-indent.dto';
import { UpdateIndentDto } from './dto/update-indent.dto';

@Injectable()
export class IndentsService {
    constructor(private readonly prisma: PrismaService) { }

    // Create Indent
    async create(dto: CreateIndentDto, userId: string) {
        const existingIndent = await this.prisma.indent.findFirst({
            where: {
                OR: [
                    { indentId: dto.indentId },
                    { indentCode: dto.indentCode }
                ],
            },
        })

        if (existingIndent) throw new ConflictException('Indent ID or Code already exists')

        // Validate Items
        for (const item of dto.items) {
            const existingItem = await this.prisma.item.findUnique({
                where: {
                    id: item.itemId
                },
            });

            if (!existingItem) throw new NotFoundException(`Item ${item.itemId} not found`)
        }

        const indent = await this.prisma.indent.create({
            data: {
                indentId: dto.indentId,
                companyId: dto.companyId,
                indentCode: dto.indentCode,
                description: dto.description,
                createdByUserId: userId,
                lastUpdatedByUserId: userId
            },
        });

        for (const item of dto.items) {
            await this.prisma.indentItem.create({
                data: {
                    indentId: indent.id,
                    itemId: item.itemId,
                    quantity: item.quantity
                },
            });

            await this.prisma.item.update({
                where: { id: item.itemId },
                data: { isLocked: true }
            });
        }

        return this.findOne(indent.id);
    }

    // Get All
    async findAll() {
        return this.prisma.indent.findMany({
            include: {
                indentItems: {
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
            orderBy: { createdAt: 'desc' }
        });
    }

    // Get One
    async findOne(id: string) {
        const indent = await this.prisma.indent.findUnique({
            where: { id },
            include: {
                indentItems: {
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

        if (!indent) throw new NotFoundException('Indent not found')

        return indent;
    }

    // Update
    async updateOne(id: string, dto: UpdateIndentDto, userId: string,) {

        const indent = await this.prisma.indent.findUnique({ where: { id } });

        if (!indent) throw new NotFoundException('Indent not found');


        if (dto.indentId || dto.indentCode) {
            const existingIndent = await this.prisma.indent.findFirst({
                where: {
                    AND: [
                        {
                            OR: [
                                { indentId: dto.indentId },
                                { indentCode: dto.indentCode }
                            ]
                        },
                        {
                            id: { not: id }
                        }
                    ]
                }
            })

            if (existingIndent) throw new ConflictException('Indent ID or Code already exists');
        }

        return this.prisma.indent.update({
            where: { id },
            data: {
                indentId: dto.indentId,
                companyId: dto.companyId,
                indentCode: dto.indentCode,
                description: dto.description,
                lastUpdatedByUserId: userId,
            },
        });
    }
}