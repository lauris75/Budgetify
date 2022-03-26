import { Controller, Post, Body, Get, Param, Patch, Request, Delete } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './create-category.dto';
import { CategoriesService } from './categories.service';

@Controller('account/:account/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async addCategory(@Body() createCategoryDto: CreateCategoryDto, @Param('account') account){
        createCategoryDto.accountId = account;
        const generatedID = await this.categoriesService.addCategory(createCategoryDto);
        return generatedID;
    }

    @Get()
    async getAllUserCategories(@Param('account') account){
        const categories = await this.categoriesService.getAllAccountCategories(account);
        return categories.map((category) => ({
            title: account.title,
            type: account.type
        }));
    }

    @Get(':id')
    async getCategorie(@Param('id') categoryId: string){
        return this.categoriesService.getCategoryByID(categoryId);
    }

    @Patch(':id')
    async updateCategorie(@Param('id') categoryId: string, @Body() updateCategoryDto: UpdateCategoryDto){
        await this.categoriesService.updateCategory(categoryId, updateCategoryDto);
        return 'Information update about the category was successful.';
    }

    @Delete(':id')
    async deleteCategorie(@Param('id') categoryID: string){
        await this.categoriesService.deleteCategory(categoryID);
        return 'Category deletion was successful.';
    }
}
