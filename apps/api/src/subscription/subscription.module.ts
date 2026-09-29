import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller.js';
import { SubscriptionService } from './subscription.service.js';
import { SubscriptionGuard } from './subscription.guard.js';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionGuard],
  exports: [SubscriptionGuard, SubscriptionService],
})
export class SubscriptionModule {}
