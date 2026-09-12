import { prisma } from '../../config/database.js';

export class TaskRepository {
  async findById(id: number) {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.task.findMany({
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
      prisma.task.findMany({
        skip,
        take,
        orderBy: { [orderBy]: sortDirection },
      }),
      prisma.task.count(),
    ]);

    return { items, total };
  }

  async create(data: {
    type?: string | null;
    subject?: string | null;
    description?: string | null;
    priority?: string | null;
    dueDateTime?: Date | string | null;
    reminderDateTime?: Date | string | null;
    category?: string | null;
    status?: string | null;
    assignedTo?: number | null;
    pointOfContact?: number | null;
    quoteId?: number | null;
    companyId?: number | null;
    inventoryId?: number | null;
    userId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.task.create({ data });
  }

  async update(id: number, data: {
    type?: string | null;
    subject?: string | null;
    description?: string | null;
    priority?: string | null;
    dueDateTime?: Date | string | null;
    reminderDateTime?: Date | string | null;
    category?: string | null;
    status?: string | null;
    assignedTo?: number | null;
    pointOfContact?: number | null;
    quoteId?: number | null;
    companyId?: number | null;
    inventoryId?: number | null;
    userId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.task.delete({
      where: { id },
    });
  }

  async deleteRange(ids: number[]) {
    return prisma.task.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
