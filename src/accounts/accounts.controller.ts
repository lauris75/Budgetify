import { Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Post()
    async addAccount(){
        return "Used for creating new accounts";
    }

    @Get()
    async getAllAccounts(){
        return "Returns all accounts assiociated with the user";
    }

    @Get(':id')
    async getAccount(@Param('id') accountID: string){
        return "Return specific account using given id (if that account is of the connected user)"
    }

    @Patch(':id')
    async updateAccount(@Param('id') accountID: string){
        return "Updates specified account (if that account is of the connected user)";
    }

    @Delete(':id')
    async deleteAccount(@Param('id') accountID: string){
        return "Deletes specified account (if that account is of the connected user)";
    }

}
