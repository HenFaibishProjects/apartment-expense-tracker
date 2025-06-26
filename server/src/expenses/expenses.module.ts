import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpensesRepository } from './expenses.repository';
import { AprApartmentStatus } from '../apartments/apartment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, AprApartmentStatus])],
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpensesRepository],
})
export class ExpensesModule {}
