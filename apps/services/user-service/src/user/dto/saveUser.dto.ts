import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "@nestjs/class-validator";

import { Type } from "@nestjs/class-transformer";

class RoleDto {
    @IsString()
    @IsNotEmpty()
    id: number;

    @IsString()
    key: string;

    @IsString()
    name: string;
}

class GroupDto {
    @IsString()
    @IsNotEmpty()
    id: number;

    @IsString()
    name: string;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    barcode: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsOptional()
    imageId?: string;

    @IsOptional()
    scores?: number;

    @ValidateNested()
    @Type(() => RoleDto)
    @IsOptional()
    role?: RoleDto;

    @ValidateNested()
    @Type(() => GroupDto)
    @IsOptional()
    group?: GroupDto;
}
