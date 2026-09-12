import { prisma } from '../../config/database.js';

export class QuoteRepository {
  async findById(id: number) {
    return prisma.quote.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByQuoteNumber(quoteNumber: string) {
    return prisma.quote.findFirst({
      where: { quoteNumber },
    });
  }

  async list({ skip = 0, take = 20, orderBy = 'createdAt', sortDirection = 'desc' }: {
    skip?: number;
    take?: number;
    orderBy?: string;
    sortDirection?: 'asc' | 'desc';
  }) {
    const [items, total] = await Promise.all([
      prisma.quote.findMany({
        skip,
        take,
        orderBy: { [orderBy]: sortDirection },
      }),
      prisma.quote.count(),
    ]);

    return { items, total };
  }

  async create(data: {
    quoteNumber?: string | null;
    name?: string | null;
    service?: string | null;
    transportMode?: string | null;
    status?: string | null;
    totalCost?: number | null;
    totalProfit?: number | null;
    expiryDate?: Date | string | null;
    totalMiles?: number | null;
    companyId?: number | null;
    contactId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.quote.create({ data });
  }

  async update(id: number, data: {
    quoteNumber?: string | null;
    name?: string | null;
    service?: string | null;
    transportMode?: string | null;
    status?: string | null;
    totalCost?: number | null;
    totalProfit?: number | null;
    expiryDate?: Date | string | null;
    totalMiles?: number | null;
    companyId?: number | null;
    contactId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.quote.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.quote.delete({
      where: { id },
    });
  }

  async deleteRange(ids: number[]) {
    return prisma.quote.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
