import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AuthModule } from './auth/auth.module.js';
import { DatabaseModule } from '@whatsapp-saas/database';
import { SubscriptionModule } from './subscription/subscription.module.js';

@Module({
  imports: [DatabaseModule, AuthModule, SubscriptionModule],
  controllers: [AppController],
})
export class AppModule {}
