import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentUser } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentUser])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
