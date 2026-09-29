import { Injectable } from '@nestjs/common';
import { PrismaService } from '@whatsapp-saas/database';
import type { SubscriptionStatus } from '@whatsapp-saas/database';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatus(businessId: string): Promise<{
    id: string;
    subscriptionStatus: SubscriptionStatus;
    trialStartedAt: Date;
    trialEndsAt: Date;
    trialDaysRemaining: number;
  } | null> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      select: {
        id: true,
        subscriptionStatus: true,
        trialStartedAt: true,
        trialEndsAt: true,
      },
    });

    if (!business) {
      return null;
    }

    const now = new Date();
    const expired = business.trialEndsAt <= now;

    return {
      ...business,
      subscriptionStatus:
        business.subscriptionStatus === 'TRIAL' && expired
          ? 'EXPIRED'
          : business.subscriptionStatus,
      trialDaysRemaining:
        business.subscriptionStatus === 'TRIAL' && !expired
          ? Math.ceil(
              (business.trialEndsAt.getTime() - now.getTime()) /
                (1000 * 60 * 60 * 24),
            )
          : 0,
    };
  }
}
