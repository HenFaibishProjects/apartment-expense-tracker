import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PropertyData } from '../property/property.entity';
import { SubscriptionPlan } from '../paypal/SubscriptionPlan';


@Entity({ name: 'apartments_users' })
export class ApartmentUser {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ nullable: true, type: 'varchar' })
  fullName: string | undefined;

  @Column({ type: 'varchar', unique: true })
  email: string | undefined;

  @Column({ type: 'varchar', unique: true })
  phone: string | undefined;

  @Column({ type: 'varchar' })
  password: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  activationCode?: string | null;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @Column({ type: 'boolean', default: false })
  isActive!: boolean;

  @Column({ type: 'varchar', nullable: true })
  activationToken: string | undefined | null;

  @Column({ type: 'varchar', nullable: true })
  resetPasswordToken: string | undefined | null;

  @Column({ nullable: true, type: 'timestamp' })
  resetTokenExpiry: Date | undefined | null;

  @OneToMany(() => PropertyData, property => property.user)
  properties: PropertyData[];

  @Column({ type: 'enum', enum: SubscriptionPlan, default: SubscriptionPlan.FREE })
  plan: SubscriptionPlan;

}


