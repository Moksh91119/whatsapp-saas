import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { SubscriptionGuard } from '../subscription/subscription.guard.js';
import { BusinessService } from './business.service.js';
import { UpdateBusinessDto } from './dto/update-business.dto.js';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto.js';

@Controller('business')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  getBusiness(@Req() req: any) {
    return this.businessService.getBusiness(req.user.userId);
  }

  @Patch()
  updateBusiness(@Req() req: any, @Body() dto: UpdateBusinessDto) {
    return this.businessService.updateBusiness(req.user.userId, dto);
  }

  @Get('settings')
  getSettings(@Req() req: any) {
    return this.businessService.getSettings(req.user.userId);
  }

  @Patch('settings')
  updateSettings(@Req() req: any, @Body() dto: UpdateBusinessSettingsDto) {
    return this.businessService.updateSettings(req.user.userId, dto);
  }
}
