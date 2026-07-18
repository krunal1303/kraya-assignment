import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';

class CreateRFQItemDto {
    @IsUUID()
    itemId: string;

    @IsUUID()
    vendorId: string;

    @IsInt()
    quantity: number;

    @IsNumber()
    price: number;
}

export class CreateRFQDto {
    @IsString()
    @IsNotEmpty()
    rfqId: string;

    @IsUUID()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    rfqCode: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateRFQItemDto)
    items: CreateRFQItemDto[];
}