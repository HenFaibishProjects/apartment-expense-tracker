import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards, Req, Put,
} from '@nestjs/common';
import { PropertyData } from './property.entity';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApartmentUser } from '../auth/user.entity';

interface AuthenticatedRequest extends Request {
  user: ApartmentUser;
}

@Controller('properties')
export class PropertyController {
  constructor(private service: PropertyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() req: AuthenticatedRequest): Promise<PropertyData[]> {
    return this.service.findAll(req.user.id!);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreatePropertyDto) {
    return this.service.create(dto, req.user.id!);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<PropertyData>
  ) {
    return this.service.update(+id, data);
  }
}
