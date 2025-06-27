import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ApartmentStatus {
  RENTED = 'RENTED',
  EMPTY = 'EMPTY',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
}

export enum OwnershipStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ElevatorPresence {
  YES = 'YES',
  NO = 'NO',
}

@Entity({ name: 'apartments_data' })
export class ApartmentData {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({
    type: 'enum',
    enum: OwnershipStatus,
    default: OwnershipStatus.ACTIVE,
  })
  activeOwn: OwnershipStatus;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  blockNumber: string;

  @Column()
  floor: number;

  @Column()
  apartmentNumber: string;

  @Column({
    type: 'enum',
    enum: ElevatorPresence,
    default: ElevatorPresence.NO,
  })
  elevator: ElevatorPresence;

  @Column('float')
  size: number;

  @Column({
    type: 'enum',
    enum: ApartmentStatus,
    default: ApartmentStatus.EMPTY,
  })
  status: ApartmentStatus;

  @Column({ type: 'date', nullable: true })
  datePurchase: Date;

  @Column({ type: 'date', nullable: true })
  dateOfSell: Date;
}
