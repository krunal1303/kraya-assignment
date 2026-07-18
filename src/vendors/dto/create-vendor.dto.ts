import { IsEmail, IsNotEmpty, IsString, IsUUID, } from 'class-validator';

export class CreateVendorDto {
    @IsString()
    @IsNotEmpty()
    vendorId: string;

    @IsUUID()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    vendorCode: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;
}