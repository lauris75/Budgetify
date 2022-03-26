import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        const result = await newUser.save();
        return result.id;
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({email: email});
    }
}