import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, } from 'class-validator';

export class AssignRolePermissionsDto {
    
    @IsUUID()
    @IsNotEmpty()
    roleId: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { each: true })
    permissionIds: string[];
}