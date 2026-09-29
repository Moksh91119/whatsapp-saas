import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AuthModule } from './auth/auth.module.js';
import { DatabaseModule } from '@whatsapp-saas/database';
import { SubscriptionModule } from './subscription/subscription.module.js';
import { BusinessModule } from './business/business.module.js';

@Module({
  imports: [DatabaseModule, AuthModule, SubscriptionModule, BusinessModule],
  controllers: [AppController],
})
export class AppModule {}
