import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ApartmentUser } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  async register(dto: CreateUserDto): Promise<ApartmentUser> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const hashed = await bcrypt.hash(dto.password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.repo.create(dto.email, hashed);
  }

  async getByEmail(email: string) {
    return this.repo.findByEmail(email);
  }

  async login(email: string) {
    return this.repo.findByEmail(email);
  }
}
