import { Injectable } from '@nestjs/common';

export type User = {
    id: Number;
    name: string;
    username: string;
    password: string;
    role: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: "Laurynas",
            username: "lauris",
            password: "abc123",
            role: "admin",
        },
        {
            id: 2,
            name: "John",
            username: "johnny",
            password: "smith",
            role: "basic",
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
