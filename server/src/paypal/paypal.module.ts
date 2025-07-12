import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [PaypalService],
  exports: [PaypalService],
})
export class PaypalModule {}
