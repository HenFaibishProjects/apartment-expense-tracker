import { Injectable } from '@nestjs/common';
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


  // async update(id: number, data: Partial<PropertyData>) {
  //   return await this.propertyRepository.update(id, data);
  // }
  //
  // async delete(id: number) {
  //   return await this.propertyRepository.delete(id);
  // }
}
