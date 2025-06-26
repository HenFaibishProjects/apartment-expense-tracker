import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Apartment } from '../apartments/apartment.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Apartment)
  apartment: Apartment;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column('float')
  estimatedCost: number;

  @Column('float')
  actualCost: number;

  @Column({ default: false })
  paid: boolean;

  @Column({ nullable: true })
  phase: string;
}
