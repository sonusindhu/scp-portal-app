import { prisma } from '../../config/database.js';

export class EmailRepository {
  async findById(id: number) {
    return prisma.email.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.email.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async list({ skip = 0, take = 20, orderBy = 'createdAt', sortDirection = 'desc' }: {
    skip?: number;
    take?: number;
    orderBy?: string;
    sortDirection?: 'asc' | 'desc';
  }) {
    const [items, total] = await Promise.all([
      prisma.email.findMany({
        skip,
        take,
        orderBy: { [orderBy]: sortDirection },
      }),
      prisma.email.count(),
    ]);

    return { items, total };
  }

  async create(data: {
    type?: string | null;
    title?: string | null;
    message?: string | null;
    toEmail?: string | null;
    fromEmail?: string | null;
    isCritical?: boolean | null;
    quoteId?: number | null;
    contactId?: number | null;
    companyId?: number | null;
    inventoryId?: number | null;
    userId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.email.create({ data });
  }

  async update(id: number, data: {
    type?: string | null;
    title?: string | null;
    message?: string | null;
    toEmail?: string | null;
    fromEmail?: string | null;
    isCritical?: boolean | null;
    quoteId?: number | null;
    contactId?: number | null;
    companyId?: number | null;
    inventoryId?: number | null;
    userId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.email.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.email.delete({
      where: { id },
    });
  }
}
