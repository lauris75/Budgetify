import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './create-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './accounts.model';

@Injectable()
export class AccountsService {

    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

    async addAccount(createAccountDto: CreateAccountDto) {
        const newAccount = new this.accountModel(createAccountDto);
        const result = await newAccount.save();
        return result.id;
    }

    async getAllUserAccounts(userId: string) {
        const accounts = await this.accountModel.find({userId: userId}).exec();
        return accounts as Account[];
    }

    async getAccountByID(accountID: string) {
        const account = await this.findAccount(accountID);
        const {_id, __v, ...rest} = account;
        return rest;
    }

    async updateAccount(accountID: string, updateAccountDto: UpdateAccountDto) {
        const updatedAccount = await this.findAccount(accountID);
        if(updateAccountDto.name){
            updatedAccount.name = updateAccountDto.name;
        }
        if(updateAccountDto.amount){
            updatedAccount.amount = updateAccountDto.amount;
        }
        if(updateAccountDto.currency){
            updatedAccount.currency = updateAccountDto.currency;
        }
        if(updateAccountDto.description){
            updatedAccount.description = updateAccountDto.description;
        }
        updatedAccount.save();
    }

    async deleteAccount(accountID: string) {
        try{
            const result = await this.accountModel.deleteOne({_id: accountID}).exec();
        } catch (error){
            throw new NotFoundException("Account with such ID wasn't found.");
        }
    }

    private async findAccount(accountID: string): Promise<Account> {
        let account: Account;
        try{
            account = await this.accountModel.findById(accountID);
        } catch (error) {
            throw new NotFoundException("Account with such ID wasn't found.");
        }
        if (!account){
            throw new NotFoundException("Account with such ID wasn't found.");
        }
        return account;
    }
}
