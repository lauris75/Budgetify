import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './expense.model';
import { CreateExpenseDto, UpdateExpenseDto } from './create-expense.dto';

@Injectable()
export class ExpensesService {

    constructor(@InjectModel('Expense') private readonly expenseModel: Model<Expense>) {}

    async addExpense(createExpenseDto: CreateExpenseDto) {
        const newExpense = new this.expenseModel(createExpenseDto);
        const result = await newExpense.save();
        return result.id;
    }

    async getAllAccountExpenses(accountId: string) {
        const expenses = await this.expenseModel.find({accountId: accountId}).exec();
        return expenses as Expense[];
    }

    async getExpenseByID(expenseId: string) {
        const expense = await this.findExpense(expenseId);
        const {_id, __v, ...rest} = expense;
        return rest;
    }

    async updateExpense(expenseId: string, updateExpenseDto: UpdateExpenseDto) {
        const updatedExpense = await this.findExpense(expenseId);
        if(updateExpenseDto.title){
            updatedExpense.title = updateExpenseDto.title;
        }
        if(updateExpenseDto.categoryId){
            updatedExpense.categoryId = updateExpenseDto.categoryId;
        }
        if(updateExpenseDto.description){
            updatedExpense.description = updateExpenseDto.description;
        }
        if(updateExpenseDto.amount){
            updatedExpense.amount = updateExpenseDto.amount;
        }
        if(updateExpenseDto.date){
            updatedExpense.date = updateExpenseDto.date;
        }
        updatedExpense.save();
    }

    async deleteExpense(expenseId: string) {
        try{
            const result = await this.expenseModel.deleteOne({_id: expenseId}).exec();
        } catch (error){
            throw new NotFoundException("Expense with such ID wasn't found.");
        }
    }

    private async findExpense(expenseId: string): Promise<Expense> {
        let expense: Expense;
        try{
            expense = await this.expenseModel.findById(expenseId);
        } catch (error) {
            throw new NotFoundException("Expense with such ID wasn't found.");
        }
        if (!expense){
            throw new NotFoundException("Expense with such ID wasn't found.");
        }
        return expense;
    }

}
