import { IsString, IsNumber, IsEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto{
    @IsEmpty({message: "You can't specify account id!"})
    accountId: string;

    @IsString({message: "Category title must be a string!"})
    title: string;

    @IsString({message: "Category type must be a string!"})
    type: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}