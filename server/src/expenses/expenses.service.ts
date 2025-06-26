import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesRepository } from './expenses.repository';

@Injectable()
export class ExpensesService {
  constructor(private readonly repo: ExpensesRepository) {}

  async create(dto: CreateExpenseDto) {
    return this.repo.create(dto);
  }

  async getByApartment(apartmentId: number) {
    return this.repo.findByApartment(apartmentId);
  }
}
