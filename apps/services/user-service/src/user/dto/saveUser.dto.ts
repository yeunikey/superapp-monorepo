import { Expose, Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested, IsNumber } from "class-validator";

class RoleDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsOptional()
  @IsString()
  key?: string;

  @Expose()
  @IsOptional()
  @IsString()
  name?: string;
}

class GroupDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsOptional()
  @IsString()
  name?: string;
}

export class CreateUserDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsString()
  barcode: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  surname: string;

  @Expose()
  @IsOptional()
  imageId?: string;

  @Expose()
  @IsOptional()
  scores?: number;

  @Expose()
  @ValidateNested()
  @Type(() => RoleDto)
  @IsOptional()
  role?: RoleDto;

  @Expose()
  @ValidateNested()
  @Type(() => GroupDto)
  @IsOptional()
  group?: GroupDto;
}
