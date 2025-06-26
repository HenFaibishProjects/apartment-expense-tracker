import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateExpenseDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('apartment/:id')
  getByApartment(@Param('id') id: string) {
    return this.service.getByApartment(Number(id));
  }
}
