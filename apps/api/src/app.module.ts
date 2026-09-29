import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AuthModule } from './auth/auth.module.js';
import { DatabaseModule } from '@whatsapp-saas/database';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
