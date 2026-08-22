import { prisma } from '../../config/database.js';

export class NoteRepository {
  async findById(id: number) {
    return prisma.note.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.note.findMany({
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
      prisma.note.findMany({
        skip,
        take,
        orderBy: { [orderBy]: sortDirection },
      }),
      prisma.note.count(),
    ]);

    return { items, total };
  }

  async create(data: {
    type?: string | null;
    title?: string | null;
    message?: string | null;
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
    return prisma.note.create({ data });
  }

  async update(id: number, data: {
    type?: string | null;
    title?: string | null;
    message?: string | null;
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
    return prisma.note.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.note.delete({
      where: { id },
    });
  }

  async deleteRange(ids: number[]) {
    return prisma.note.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
