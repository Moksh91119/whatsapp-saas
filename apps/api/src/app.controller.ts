import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return {
      status: 'ok',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: { user: { userId: string; email: string } }) {
    return req.user;
  }
}
