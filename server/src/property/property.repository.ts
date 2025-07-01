import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyData } from './property.entity';

@Injectable()
export class PropertyRepository {
  constructor(
    @InjectRepository(PropertyData)
    private readonly repo: Repository<PropertyData>,
  ) {}

  findAll(): Promise<PropertyData[]> {
    return this.repo.find({ order: { datePurchase: 'ASC' } });
  }

  findOne(id: number): Promise<PropertyData | null> {
    return this.repo.findOneBy({ id });
  }

  create(apartment: CreatePropertyDto): Promise<PropertyData> {
    const newApartment = this.repo.create(apartment);
    return this.repo.save(newApartment);
  }

  async update(
    id: number,
    updateData: Partial<PropertyData>,
  ): Promise<PropertyData | undefined> {
    await this.repo.update(id, updateData);
    const updated = await this.repo.findOneBy({ id });
    return updated ?? undefined;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
    return undefined;
  }
}
