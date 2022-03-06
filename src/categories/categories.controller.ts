import { Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('account/:account/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async addCategorie(@Param('account') account){
        return "Used for creating new categories for the specified account";
    }

    @Get()
    async getAllCategories(){
        return "Returns all categories assiociated with the account";
    }

    @Get(':id')
    async getCategorie(@Param('account') account, @Param('id') categoryID: string){
        return "Return specific category using given id (if that category is of the connected user)"
    }

    @Patch(':id')
    async updateCategorie(@Param('account') account, @Param('id') categoryID: string){
        return "Updates specified category (if that category is of the connected user)";
    }

    @Delete(':id')
    async deleteCategorie(@Param('account') account, @Param('id') categoryID: string){
        return "Deletes specified category from the account (if that category is of the connected user)";
    }
}