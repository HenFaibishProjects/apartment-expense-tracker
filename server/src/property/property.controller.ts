import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PropertyData } from './property.entity';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('properties')
export class PropertyController {
  constructor(private service: PropertyService) {}

  @Get()
  getAll(): Promise<PropertyData[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<PropertyData>,
  ) {
    return this.service.update(id, data);
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
