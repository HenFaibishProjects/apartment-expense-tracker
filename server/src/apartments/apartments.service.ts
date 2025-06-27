import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApartmentData } from './apartment.entity';
import { ApartmentRepository } from './apartments.repository';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(ApartmentData)
    private apartmentRepository: ApartmentRepository,
  ) {}

  async findAll(): Promise<ApartmentData[]> {
    return await this.apartmentRepository.findAll();
  }

  async findOne(id: number) {
    return await this.apartmentRepository.findOne(id);
  }

  async create(dto: CreateApartmentDto) {
    return await this.apartmentRepository.create(dto);
  }

  async update(id: number, data: Partial<ApartmentData>) {
    return await this.apartmentRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.apartmentRepository.delete(id);
  }
}
