import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateNewsDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsOptional()
  @IsString()
  imageId?: string | null;
}