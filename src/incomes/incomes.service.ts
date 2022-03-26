import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income } from './income.model';
import { CreateIncomeDto, UpdateIncomeDto } from './create-income.dto';

@Injectable()
export class IncomesService {

    constructor(@InjectModel('Income') private readonly incomeModel: Model<Income>) {}

    async addIncome(createIncomeDto: CreateIncomeDto) {
        const newIncome = new this.incomeModel(createIncomeDto);
        const result = await newIncome.save();
        return result.id;
    }

    async getAllAccountIncomes(accountId: string) {
        const incomes = await this.incomeModel.find({accountId: accountId}).exec();
        return incomes as Income[];
    }

    async getIncomeByID(incomeId: string) {
        const income = await this.findIncome(incomeId);
        const {_id, __v, ...rest} = income;
        return rest;
    }

    async updateIncome(incomeId: string, updateIncomeDto: UpdateIncomeDto) {
        const updatedIncome = await this.findIncome(incomeId);
        if(updateIncomeDto.title){
            updatedIncome.title = updateIncomeDto.title;
        }
        if(updateIncomeDto.categoryId){
            updatedIncome.categoryId = updateIncomeDto.categoryId;
        }
        if(updateIncomeDto.description){
            updatedIncome.description = updateIncomeDto.description;
        }
        if(updateIncomeDto.amount){
            updatedIncome.amount = updateIncomeDto.amount;
        }
        if(updateIncomeDto.date){
            updatedIncome.date = updateIncomeDto.date;
        }
        updatedIncome.save();
    }

    async deleteIncome(incomeId: string) {
        try{
            const result = await this.incomeModel.deleteOne({_id: incomeId}).exec();
        } catch (error){
            throw new NotFoundException("Income with such ID wasn't found.");
        }
    }

    private async findIncome(incomeId: string): Promise<Income> {
        let income: Income;
        try{
            income = await this.incomeModel.findById(incomeId);
        } catch (error) {
            throw new NotFoundException("Expense with such ID wasn't found.");
        }
        if (!income){
            throw new NotFoundException("Expense with such ID wasn't found.");
        }
        return income;
    }

}
