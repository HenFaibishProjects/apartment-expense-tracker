import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { PropertyData } from './property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    private propertyRepository: PropertyRepository,
  ) {}

  async findAll(): Promise<PropertyData[]> {
    return await this.propertyRepository.findAll();
  }

  async findOne(id: number) {
    return await this.propertyRepository.findOne(id);
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepository.create(dto);
  }

  async update(id: number, data: Partial<PropertyData>) {
    return await this.propertyRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.propertyRepository.delete(id);
  }
}
