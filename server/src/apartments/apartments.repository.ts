import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AprApartmentStatus } from './apartment.entity';

@Injectable()
export class ApartmentRepository {
  constructor(
    @InjectRepository(AprApartmentStatus)
    private readonly repo: Repository<AprApartmentStatus>,
  ) {}

  findAll(): Promise<AprApartmentStatus[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<AprApartmentStatus | null> {
    return this.repo.findOneBy({ id });
  }

  create(apartment: Partial<AprApartmentStatus>): Promise<AprApartmentStatus> {
    const newApartment = this.repo.create(apartment);
    return this.repo.save(newApartment);
  }

  async update(
    id: number,
    updateData: Partial<AprApartmentStatus>,
  ): Promise<AprApartmentStatus | undefined> {
    await this.repo.update(id, updateData);
    const updated = await this.repo.findOneBy({ id });
    return updated ?? undefined;
  }

  delete(id: number): Promise<void> {
    return this.repo.delete(id).then(() => undefined);
  }
}
