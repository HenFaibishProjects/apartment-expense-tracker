import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentUser } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(ApartmentUser) private repo: Repository<ApartmentUser>) {}

  async save(user: ApartmentUser): Promise<ApartmentUser> {
    return this.repo.save(user);
  }

  async create(email: string, hashedPassword: string): Promise<ApartmentUser> {
    const user = this.repo.create({ email, password: hashedPassword });
    return this.repo.save(user);
  }

  async findByEmail(email: string): Promise<ApartmentUser | null> {
    return this.repo.findOne({ where: { email } });
  }

}
