import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ApartmentStatus {
  RENTED = 'RENTED',
  EMPTY = 'EMPTY',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
}

@Entity()
export class AprApartmentStatus {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  address: string | undefined;

  @Column('float')
  size: number | undefined;

  @Column({
    type: 'enum',
    enum: ApartmentStatus,
    default: ApartmentStatus.EMPTY,
  })
  status: ApartmentStatus | undefined;
}
