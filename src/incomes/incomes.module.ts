import { Module } from '@nestjs/common';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeSchema } from './income.model';

@Module({
  imports: [MongooseModule.forFeature([{name:'Income', schema: IncomeSchema}])],
  controllers: [IncomesController],
  providers: [IncomesService]
})
export class IncomesModule {}