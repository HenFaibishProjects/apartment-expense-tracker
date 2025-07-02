import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn, ManyToOne,
} from 'typeorm';
import { ApartmentUser } from '../auth/user.entity';

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
  UNDER_RENOVATION = 'UNDER_RENOVATION',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  OFF_MARKET = 'OFF_MARKET',
}

export enum OwnershipStatus {
  OWNED = 'OWNED', // Fully owned by the user or company
  MORTGAGED = 'MORTGAGED', // Owned but under mortgage
  RENTED = 'RENTED', // Not owned, but rented from someone else
  LEASED = 'LEASED', // Long-term lease
  INHERITED = 'INHERITED', // Acquired by inheritance
  TRANSFER_PENDING = 'TRANSFER_PENDING', // In process of ownership change
  SOLD = 'SOLD', // Was owned, but now sold
  OTHER = 'OTHER', // Fallback
}

export enum ElevatorPresence {
  YES = 'YES', // Elevator is present and functional
  NO = 'NO', // No elevator at all
  PLANNED = 'PLANNED', // Will be installed (e.g. building under construction or renovation)
  NOT_REQUIRED = 'NOT_REQUIRED', // Ground floor, duplex, house, etc.
  UNKNOWN = 'UNKNOWN', // Info not available
}

export enum PropertyType {
  APARTMENT = 'Apartment',
  HOUSE = 'House',
  DUPLEX = 'Duplex',
  PENTHOUSE = 'Penthouse',
  STUDIO = 'Studio',
  VILLA = 'Villa',
  TOWNHOUSE = 'Townhouse',
  COTTAGE = 'Cottage',
  LOFT = 'Loft',
  BUNGALOW = 'Bungalow',
  FARMHOUSE = 'Farmhouse',
  COMMERCIAL = 'Commercial',
  OFFICE = 'Office',
  WAREHOUSE = 'Warehouse',
  OTHER = 'Other',
}

@Entity({ name: 'property_data' })
export class PropertyData {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({
    type: 'enum',
    enum: OwnershipStatus,
  })
  ownershipStatus: OwnershipStatus;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  propertyType: PropertyType;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  blockNumber: string;

  @Column({ type: 'int', nullable: true })
  floor: number | null;

  @Column({ type: 'int', nullable: true })
  floorsCount: number | null;

  @Column()
  apartmentNumber: string;

  @Column({
    type: 'enum',
    enum: ElevatorPresence,
  })
  elevator: ElevatorPresence;

  @Column('float')
  sizeUtil: number;

  @Column('float', { nullable: true })
  sizeYard: number | null;

  @Column('float')
  bedRooms: number;

  @Column('float')
  bathNumber: number;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
  })
  propertyStatus: PropertyStatus;

  @Column({ type: 'date', nullable: true })
  @CreateDateColumn()
  datePurchase: Date;

  @Column({ type: 'date', nullable: true })
  @CreateDateColumn()
  dateOfSell: Date;

  @Column({ nullable: true })
  zip: number;

  @ManyToOne(() => ApartmentUser, user => user.properties, { onDelete: 'CASCADE' })
  user: ApartmentUser;
}
