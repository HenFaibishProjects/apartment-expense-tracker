import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { PropertyData } from './property.entity';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('properties')
export class PropertyController {
  constructor(private service: PropertyService) {}

  @Get()
  getAll(): Promise<PropertyData[]> {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePropertyDto) {
    console.log('🔍 Controller - Request reached the controller'); // Add this line
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
