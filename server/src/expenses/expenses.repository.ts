import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { PropertyData } from '../property/property.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesRepository {
  constructor(@InjectRepository(Expense) private repo: Repository<Expense>) {}

  async create(data: CreateExpenseDto): Promise<Expense> {
    const expense = this.repo.create({
      ...data,
      apartment: { id: data.apartmentId } as PropertyData,
    });
    return this.repo.save(expense);
  }

  async findByApartment(apartmentId: number): Promise<Expense[]> {
    return this.repo.find({
      where: { apartment: { id: apartmentId } },
    });
  }
}
