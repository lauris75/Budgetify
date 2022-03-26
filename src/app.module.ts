import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AccountsModule, CategoriesModule, IncomesModule, ExpensesModule, UsersModule, AuthModule,
  MongooseModule.forRoot('mongodb+srv://lauris:nesakysiu@cluster0.pq913.mongodb.net/nodejsTutorial?retryWrites=true&w=majority'),],
  controllers: [AppController],
  providers: [{provide: APP_GUARD, useClass: JwtAuthGuard}, AppService],
})
export class AppModule {}
