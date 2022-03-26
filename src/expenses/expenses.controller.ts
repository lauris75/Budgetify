import { Controller, Post, Body, Get, Param, Patch, Request, Delete } from '@nestjs/common';
import { CreateExpenseDto, UpdateExpenseDto } from './create-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('account/:account/expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) {}

    @Post()
    async addExpense(@Body() createExpenseDto: CreateExpenseDto, @Param('account') account){
        createExpenseDto.accountId = account;
        const generatedId = await this.expensesService.addExpense(createExpenseDto)
        return generatedId;
    }

    @Get()
    async getAllAccountExpenses(@Param('account') account){
        const expenses= await this.expensesService.getAllAccountExpenses(account);
        return expenses.map((expense) => ({
            id: expense.id,
            title: expense.title,
            categoryId: expense.categoryId,
            description: expense.description,
            amount: expense.amount,
            date: expense.date
        }))
    }

    @Get(':id')
    async getExpense(@Param('id') expenseId: string){
        return this.expensesService.getExpenseByID(expenseId);
    }

    @Patch(':id')
    async updateExpense(@Param('id') expenseId: string, @Body() updateExpenseDto: UpdateExpenseDto): Promise<string>{
        await this.expensesService.updateExpense(expenseId, updateExpenseDto)
        return "Information update about the expense was successful.";
    }

    @Delete(':id')
    async deleteExpense(@Param('id') expenseId: string){
        await this.expensesService.deleteExpense(expenseId);
        return 'Expense deletion successful.';
    }
}
