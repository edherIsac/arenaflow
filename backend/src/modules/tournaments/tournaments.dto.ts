import { IsString, IsNotEmpty, IsEnum, IsDate, IsOptional } from 'class-validator';

export class CreateTournamentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsEnum({ active: 'active', completed: 'completed', scheduled: 'scheduled' })
  status: 'active' | 'completed' | 'scheduled';
}

export class UpdateTournamentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsEnum({ active: 'active', completed: 'completed', scheduled: 'scheduled' })
  status?: 'active' | 'completed' | 'scheduled';
}
