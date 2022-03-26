import { IsString, IsNumber, IsEmpty, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto{

    @IsEmail({message: "Invalid email!"})
    email: string;

    @IsString({message: "Password must be a string!"})
    password: string;

    @IsString({message: "Name must be a string!"})
    name: string;

    @IsString({message: "Surname must be a string!"})
    surname: number;

    @IsString({message: "Date must be a string!"})
    dateOfBirth: string;

    @IsString({message: "Country must be a string!"})
    country: string;

    @IsString({message: "Role must be a string!"})
    role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}