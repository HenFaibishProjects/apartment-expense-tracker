import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyRepository } from './property.repository';
import { PropertyData } from './property.entity';
import { ApartmentUser } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ApartmentUser, PropertyData])],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository]
})
export class PropertyModule {}
