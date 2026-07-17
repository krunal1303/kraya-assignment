import { IsEmail, IsNotEmpty, IsString, Matches, } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}