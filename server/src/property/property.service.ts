import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyData } from './property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApartmentUser } from '../auth/user.entity';

@Injectable()
export class PropertyService {
  constructor(
  @InjectRepository(PropertyData)
  private propertyRepository: Repository<PropertyData>,
  @InjectRepository(ApartmentUser)
  private userRepository: Repository<ApartmentUser>
  ) {}


  async findAll(userId: number) {
    return await this.propertyRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
  }

  async create(dto: CreatePropertyDto, userId: number) {
    const user = await this.userRepository.findOneByOrFail({ id: userId }); // Make sure you inject userRepository

    const entry = this.propertyRepository.create({
      ...dto,
      user
    });

    return await this.propertyRepository.save(entry);
  }

  async update(id: number, data: Partial<PropertyData>) {
    const property = await this.propertyRepository.findOneByOrFail({ id });

    const updated = this.propertyRepository.merge(property, {
      ...data,
      user: property.user
    });

    return await this.propertyRepository.save(updated);
  }


  async delete(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return this.propertyRepository.delete(id);
  }
}
