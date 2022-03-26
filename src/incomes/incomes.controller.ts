import { Controller, Post, Body, Get, Param, Patch, Request, Delete } from '@nestjs/common';
import { CreateIncomeDto, UpdateIncomeDto } from './create-income.dto';
import { IncomesService } from './incomes.service';

@Controller('account/:account/incomes')
export class IncomesController {
    constructor(private readonly incomesService: IncomesService) {}

    @Post()
    async addIncome(@Body() createIncomeDto: CreateIncomeDto, @Param('account') account){
        createIncomeDto.accountId = account;
        const generatedId = await this.incomesService.addIncome(createIncomeDto)
        return generatedId;
    }

    @Get()
    async getAllIncomes(@Param('account') account){
        const incomes= await this.incomesService.getAllAccountIncomes(account);
        return incomes.map((income) => ({
            id: income.id,
            title: income.title,
            categoryId: income.categoryId,
            description: income.description,
            amount: income.amount,
            date: income.date
        }))
    }

    @Get(':id')
    async getIncome(@Param('id') incomeId: string){
        return this.incomesService.getIncomeByID(incomeId);
    }

    @Patch(':id')
    async updateIncome(@Param('id') incomeId: string, @Body() updateIncomeDto: UpdateIncomeDto){
        await this.incomesService.updateIncome(incomeId, updateIncomeDto)
        return "Information update about the income was successful.";
    }

    @Delete(':id')
    async deleteIncome(@Param('id') incomeId: string){
        await this.incomesService.deleteIncome(incomeId);
        return 'Income deletion successful.';
    }
}
