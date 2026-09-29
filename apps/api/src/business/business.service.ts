import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@whatsapp-saas/database';
import { UpdateBusinessDto } from './dto/update-business.dto.js';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto.js';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async getBusiness(userId: string) {
    const business = await this.prisma.business.findUnique({
      where: { ownerId: userId },
      include: { settings: true },
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    return business;
  }

  async updateBusiness(userId: string, dto: UpdateBusinessDto) {
    const business = await this.prisma.business.findUnique({
      where: { ownerId: userId },
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    return this.prisma.business.update({
      where: { id: business.id },
      data: dto,
    });
  }

  async getSettings(userId: string) {
    const business = await this.prisma.business.findUnique({
      where: { ownerId: userId },
      include: { settings: true },
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    return business.settings;
  }

  async updateSettings(userId: string, dto: UpdateBusinessSettingsDto) {
    const business = await this.prisma.business.findUnique({
      where: { ownerId: userId },
      include: { settings: true },
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    if (!business.settings) {
      return this.prisma.businessSettings.create({
        data: {
          businessId: business.id,
          ...dto,
        },
      });
    }

    return this.prisma.businessSettings.update({
      where: { businessId: business.id },
      data: dto,
    });
  }
}
