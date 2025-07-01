import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpensesRepository } from './expenses.repository';
import { PropertyData } from '../property/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, PropertyData])],
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpensesRepository],
})
export class ExpensesModule {}
