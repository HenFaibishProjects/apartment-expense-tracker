import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AprApartmentStatus } from './apartment.entity';
import { ApartmentRepository } from './apartments.repository';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(AprApartmentStatus)
    private apartmentRepository: ApartmentRepository,
  ) {}

  async findAll(): Promise<AprApartmentStatus[]> {
    return await this.apartmentRepository.findAll();
  }

  async findOne(id: number) {
    return await this.apartmentRepository.findOne(id);
  }

  async create(data: Partial<AprApartmentStatus>) {
    return await this.apartmentRepository.create(data);
  }

  async update(id: number, data: Partial<AprApartmentStatus>) {
    return await this.apartmentRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.apartmentRepository.delete(id);
  }
}
