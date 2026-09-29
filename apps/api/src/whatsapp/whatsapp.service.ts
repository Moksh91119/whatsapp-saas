import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@whatsapp-saas/database';

@Injectable()
export class WhatsAppService {
  constructor(private readonly prisma: PrismaService) {}

  async getConnection(userId: string) {
    const business = await this.prisma.business.findUnique({
      where: { ownerId: userId },
      include: { whatsappAccount: true },
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    return (
      business.whatsappAccount ?? {
        status: 'DISCONNECTED',
        phoneNumber: null,
        connectedAt: null,
      }
    );
  }
}
