import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBusinessSettingsDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  timezone?: string;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;
}
