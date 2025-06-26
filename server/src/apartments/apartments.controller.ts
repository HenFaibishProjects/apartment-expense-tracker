import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { AprApartmentStatus } from './apartment.entity';

@Controller('apartments')
export class ApartmentsController {
  constructor(private service: ApartmentsService) {}

  @Get()
  getAll(): Promise<AprApartmentStatus[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: Partial<AprApartmentStatus>) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<AprApartmentStatus>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
