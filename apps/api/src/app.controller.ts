import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { SubscriptionGuard } from './subscription/subscription.guard.js';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @UseGuards(JwtAuthGuard, SubscriptionGuard)
  @Get('protected')
  protectedRoute(
    @Req()
    req: {
      user: { userId: string; email: string };
      business: { id: string };
    },
  ) {
    return {
      message: 'Access granted',
      userId: req.user.userId,
      businessId: req.business.id,
    };
  }
}
