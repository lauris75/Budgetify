import { Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { IncomesService } from './incomes.service';

@Controller('account/:account/incomes')
export class IncomesController {
    constructor(private readonly incomesService: IncomesService) {}

    @Post()
    async addIncome(@Param('account') account){
        return "Used for creating new incomes for the specified account";
    }

    @Get()
    async getAllIncomes(){
        return "Returns all incomes assiociated with the account";
    }

    @Get(':id')
    async getIncome(@Param('account') account, @Param('id') incomeID: string){
        return "Return specific income using given id (if that income is of the connected user)"
    }

    @Patch(':id')
    async updateIncome(@Param('account') account, @Param('id') incomeID: string){
        return "Updates specified income (if that income is of the connected user)";
    }

    @Delete(':id')
    async deleteIncome(@Param('account') account, @Param('id') incomeID: string){
        return "Deletes specified income from the account (if that category is of the connected user)";
    }
}
