import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if(user && user.password === password){
            const { password, email, ...rest} = user;
            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = { name: user._doc.name, sub: user._doc._id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
