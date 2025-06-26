import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ApartmentsRepository {
  constructor(
    @InjectRepository(Apartment) private repo: Repository<Apartment>,
  ) {}

  async create(
    name: string,
    location: string,
    ownerId: number,
  ): Promise<Apartment> {
    const apartment = this.repo.create({
      name,
      location,
      owner: { id: ownerId } as User,
    });
    return this.repo.save(apartment);
  }

  async findAll(): Promise<Apartment[]> {
    return this.repo.find({ relations: ['owner'] });
  }
}
