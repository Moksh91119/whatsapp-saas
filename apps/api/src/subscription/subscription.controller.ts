import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { PrismaService } from '@whatsapp-saas/database';
import { SubscriptionService } from './subscription.service.js';
import type { SubscriptionStatus } from '@whatsapp-saas/database';

@Controller('subscription')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get()
  async getSubscription(@Req() req: { user: { userId: string } }): Promise<
    | {
        id: string;
        subscriptionStatus: SubscriptionStatus;
        trialStartedAt: Date;
        trialEndsAt: Date;
        trialDaysRemaining: number;
      }
    | { status: 'NO_BUSINESS' }
    | null
  > {
    const business = await this.prisma.business.findUnique({
      where: { ownerId: req.user.userId },
      select: { id: true },
    });

    if (!business) {
      return { status: 'NO_BUSINESS' };
    }

    return this.subscriptionService.getStatus(business.id);
  }
}
