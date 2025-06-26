import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AprApartmentStatus } from './apartment.entity';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { ApartmentsRepository } from './apartments.repository';
import { ApartmentUser } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AprApartmentStatus, ApartmentUser])],
  controllers: [ApartmentsController],
  providers: [ApartmentsService, ApartmentsRepository],
})
export class ApartmentsModule {}
