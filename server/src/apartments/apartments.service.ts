import { Injectable } from '@nestjs/common';
import { ApartmentsRepository } from './apartments.repository';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(private readonly repo: ApartmentsRepository) {}

  async create(dto: CreateApartmentDto) {
    return this.repo.create(dto.name, dto.location, dto.ownerId);
  }

  async getAll() {
    return this.repo.findAll();
  }
}
