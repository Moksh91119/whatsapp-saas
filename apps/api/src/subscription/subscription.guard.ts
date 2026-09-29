import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@whatsapp-saas/database';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as { userId: string } | undefined;

    if (!user) {
      throw new UnauthorizedException();
    }

    const business = await this.prisma.business.findUnique({
      where: { ownerId: user.userId },
      select: {
        id: true,
        subscriptionStatus: true,
        trialEndsAt: true,
      },
    });

    if (!business) {
      throw new ForbiddenException('No business associated with this account');
    }

    if (business.subscriptionStatus === 'ACTIVE') {
      request.business = business;
      return true;
    }

    if (
      business.subscriptionStatus === 'TRIAL' &&
      business.trialEndsAt > new Date()
    ) {
      request.business = business;
      return true;
    }

    throw new ForbiddenException(
      'Your trial has expired or subscription is inactive',
    );
  }
}
