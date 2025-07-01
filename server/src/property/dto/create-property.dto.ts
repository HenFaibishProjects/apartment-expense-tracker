import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';
import {
  ElevatorPresence,
  OwnershipStatus,
  PropertyStatus,
  PropertyType,
} from '../property.entity';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEnum(OwnershipStatus)
  ownershipStatus: OwnershipStatus;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  blockNumber: string;

  @IsOptional()
  @IsNumber()
  floor?: number;

  @IsOptional()
  @IsNumber()
  floorsCount?: number;

  @IsString()
  @IsNotEmpty()
  apartmentNumber: string;

  @IsEnum(ElevatorPresence)
  elevator: ElevatorPresence;

  @IsNumber()
  sizeUtil: number;

  @IsNumber()
  sizeYard: number;

  @IsNumber()
  bedRooms: number;

  @IsNumber()
  bathNumber: number;

  @IsEnum(PropertyStatus)
  propertyStatus: PropertyStatus;

  @IsOptional()
  @IsDateString()
  datePurchase?: Date;
}
