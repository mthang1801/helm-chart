import { IsString, IsNumber, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';

export class ConnectionDto {
  @IsString()
  @IsNotEmpty()
  hostname: string;

  @IsNumber()
  @Min(1)
  @Max(65535)
  port: number;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  database: string;
}
