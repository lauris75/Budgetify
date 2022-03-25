import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

    async addCategory(createCategoryDto: CreateCategoryDto) {
        const newCategory = new this.categoryModel(createCategoryDto);
        const result = await newCategory.save();
        return result.id;
    }

    async getAllAccountCategories(accountId: string) {
        const categories = await this.categoryModel.find({accountId: accountId}).exec();
        return categories as Category[];
    }

    async getCategoryByID(categoryId: string) {
        const category = await this.findCategory(categoryId);
        const {_id, __v, ...rest} = category;
        return rest;
    }

    async updateCategory(categoryID: string, updateCategoryDto: UpdateCategoryDto) {
        const updatedCategory = await this.findCategory(categoryID);
        if(updateCategoryDto.title){
            updatedCategory.title = updateCategoryDto.title;
        }
        updatedCategory.save();
    }

    async deleteCategory(categoryId: string) {
        try{
            const result = await this.categoryModel.deleteOne({_id: categoryId}).exec();
        } catch (error){
            throw new NotFoundException("Category with such ID wasn't found.");
        }
    }

    private async findCategory(categoryId: string): Promise<Category> {
        let category: Category;
        try{
            category = await this.categoryModel.findById(categoryId);
        } catch (error) {
            throw new NotFoundException("Category with such ID wasn't found.");
        }
        if (!category){
            throw new NotFoundException("Category with such ID wasn't found.");
        }
        return category;
    }
}
