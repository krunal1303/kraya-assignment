import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';

class CreateMiItemDto {
    @IsUUID()
    @IsNotEmpty()
    itemId: string;

    @IsInt()
    quantity: number;
}

export class CreateMiDto {
    @IsString()
    @IsNotEmpty()
    miId: string;

    @IsUUID()
    @IsNotEmpty()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    miCode: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMiItemDto)
    items: CreateMiItemDto[];
}