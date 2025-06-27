import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ApartmentStatus {
  RENTED = 'RENTED',
  EMPTY = 'EMPTY',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
}

@Entity({ name: 'apartments_status' })
export class AprApartmentStatus {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  addressStreet: string;

  @Column()
  addressCity: string;

  @Column()
  addressZipCode: string;

  @Column('float')
  size: number | undefined;

  @Column({
    type: 'enum',
    enum: ApartmentStatus,
    default: ApartmentStatus.EMPTY,
  })
  status: ApartmentStatus | undefined;
}
