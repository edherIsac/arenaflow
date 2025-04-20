
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateRefereeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty() // Si el teléfono es opcional
  @IsString()
  password: string;

}

export class UpdateRefereeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty() // Si el teléfono es opcional
    @IsString()
    password: string;
}
