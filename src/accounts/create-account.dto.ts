import { IsString, IsNumber, IsEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAccountDto{
    @IsEmpty({message: "You can't specify user id!"})
    userId: string;

    @IsString({message: "Account name must be a string!"})
    name: string;

    @IsNumber()
    amount: number;

    @IsString({message: "Currency must be a string!"})
    currency: string;

    @IsString({message: "Description must be a string!"})
    description: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}