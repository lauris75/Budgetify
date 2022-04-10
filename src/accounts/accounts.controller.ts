import { Controller, Post, Body, Get, Param, Patch, Request, Delete } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './create-account.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Post()
    async addAccount(@Body() createAccountDto: CreateAccountDto, @Request() req) {
        console.log(req.user);
        createAccountDto.userId = req.user.id;
        const createdAccount = await this.accountsService.addAccount(createAccountDto);
        return createdAccount;
    }

    @Get()
    async getAllUserAccounts(@Request() req){
        const accounts = await this.accountsService.getAllUserAccounts(req.user.id);
        return accounts.map((account) => ({
            id: account.id,
            name: account.name,
            amount: account.amount,
            currency: account.currency,
            description: account.description
        }));
    }

    @Get(':id')
    async getAccount(@Param('id') accountID: string){
        return this.accountsService.getAccountByID(accountID);
    }

    @Patch(':id')
    async updateAccount(
        @Param('id') accountID: string,
        @Body() updateAccountDto: UpdateAccountDto) {
        return await this.accountsService.updateAccount(accountID, updateAccountDto);
    }

    @Delete(':id')
    async deleteAccount(@Param('id') accountID: string) {
        return await this.accountsService.deleteAccount(accountID);
    }

}
