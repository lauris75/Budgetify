import { Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('account/:account/expenses')
export class ExpensesController {
    constructor(private readonly ExpensesService: ExpensesService) {}

    @Post()
    async addExpense(@Param('account') account){
        return "Used for creating new expenses for the specified account";
    }

    @Get()
    async getAllExpenses(){
        return "Returns all expenses assiociated with the account";
    }

    @Get(':id')
    async getExpense(@Param('account') account, @Param('id') expenseID: string){
        return "Return specific expense using given id (if that expense is of the connected user)"
    }

    @Patch(':id')
    async updateExpense(@Param('account') account, @Param('id') expenseID: string){
        return "Updates specified expense (if that expense is of the connected user)";
    }

    @Delete(':id')
    async deleteExpense(@Param('account') account, @Param('id') expenseID: string){
        return "Deletes specified expense from the account (if that expense is of the connected user)";
    }
}
