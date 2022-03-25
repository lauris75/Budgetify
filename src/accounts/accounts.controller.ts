import { Controller, Post, Body, Get, Param, Patch, Request, Delete } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './create-account.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Post()
    async addAccount(@Body() createAccountDto: CreateAccountDto, @Request() req) {
        createAccountDto.userId = req.user.id;
        const generatedID = await this.accountsService.addAccount(createAccountDto);
        return generatedID;
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
        @Body() updateAccountDto: UpdateAccountDto): Promise<string> {
        await this.accountsService.updateAccount(accountID, updateAccountDto);
        return 'Information update about the account was successful.';
    }

    @Delete(':id')
    async deleteAccount(@Param('id') accountID: string): Promise<string>{
        await this.accountsService.deleteAccount(accountID);
        return 'Account deletion successful.';
    }

}
