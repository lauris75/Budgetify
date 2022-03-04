import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [AccountsModule, CategoriesModule, IncomesModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
