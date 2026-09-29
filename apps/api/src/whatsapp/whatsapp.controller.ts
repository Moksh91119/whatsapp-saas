import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { SubscriptionGuard } from '../subscription/subscription.guard.js';
import { WhatsAppService } from './whatsapp.service.js';

@Controller('whatsapp')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Get('connection')
  getConnection(@Req() req: any) {
    return this.whatsappService.getConnection(req.user.userId);
  }
}
