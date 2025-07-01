import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PropertyData } from '../property/property.entity';

@Entity()
@Entity({ name: 'apartments_expenses' })
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PropertyData)
  apartment: PropertyData;

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
