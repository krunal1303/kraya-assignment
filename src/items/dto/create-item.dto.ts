import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, } from 'class-validator';

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    itemId: string;

    @IsUUID()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    itemCode: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    unit: string;

    @IsNumber()
    price: number;
}