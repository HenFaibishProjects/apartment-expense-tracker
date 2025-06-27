import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentData } from './apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Injectable()
export class ApartmentRepository {
  constructor(
    @InjectRepository(ApartmentData)
    private readonly repo: Repository<ApartmentData>,
  ) {}

  findAll(): Promise<ApartmentData[]> {
    return this.repo.find({ order: { datePurchase: 'ASC' } });
  }

  findOne(id: number): Promise<ApartmentData | null> {
    return this.repo.findOneBy({ id });
  }

  create(apartment: CreateApartmentDto): Promise<ApartmentData> {
    const newApartment = this.repo.create(apartment);
    return this.repo.save(newApartment);
  }

  async update(
    id: number,
    updateData: Partial<ApartmentData>,
  ): Promise<ApartmentData | undefined> {
    await this.repo.update(id, updateData);
    const updated = await this.repo.findOneBy({ id });
    return updated ?? undefined;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
    return undefined;
  }
}
