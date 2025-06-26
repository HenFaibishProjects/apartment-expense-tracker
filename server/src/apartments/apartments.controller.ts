import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly service: ApartmentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateApartmentDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.service.getAll();
  }
}
