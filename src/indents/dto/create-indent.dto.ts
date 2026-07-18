import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';

class CreateIndentItemDto {
    @IsUUID()
    itemId: string;

    @IsInt()
    quantity: number;
}

export class CreateIndentDto {
    @IsString()
    @IsNotEmpty()
    indentId: string;

    @IsUUID()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    indentCode: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateIndentItemDto)
    items: CreateIndentItemDto[];
}