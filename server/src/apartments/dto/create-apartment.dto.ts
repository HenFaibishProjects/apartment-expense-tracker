import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  ApartmentStatus,
  ElevatorPresence,
  OwnershipStatus,
} from '../apartment.entity';

export class CreateApartmentDto {
  @IsString()
  nickname: string;

  @IsEnum(OwnershipStatus)
  activeOwn: OwnershipStatus;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  blockNumber: string;

  @IsNumber()
  floor: number;

  @IsString()
  apartmentNumber: string;

  @IsEnum(ElevatorPresence)
  elevator: ElevatorPresence;

  @IsNumber()
  size: number;

  @IsEnum(ApartmentStatus)
  status: ApartmentStatus;

  @IsString()
  datePurchase: string;
}
