import { IsString, IsNumber, IsEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateIncomeDto{
    @IsEmpty({message: "You can't specify user id!"})
    accountId: string;

    @IsString({message: "Expense title must be a string!"})
    title: string;

    @IsString({message: "Category must be a string!"})
    categoryId: string;

    @IsString({message: "Description must be a string!"})
    description: string;

    @IsNumber()
    amount: number;

    @IsString({message: "Date must be a string!"})
    date: string;
}

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {}