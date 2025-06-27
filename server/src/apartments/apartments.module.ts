import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentData } from './apartment.entity';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { ApartmentUser } from '../users/user.entity';
import { ApartmentRepository } from './apartments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentData, ApartmentUser])],
  controllers: [ApartmentsController],
  providers: [ApartmentsService, ApartmentRepository],
})
export class ApartmentsModule {}
