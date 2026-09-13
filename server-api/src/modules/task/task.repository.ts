import { prisma } from '../../config/database.js';
import { buildFilterWhere, enrichListItems, parseSortValue } from '../../common/utils/list-query.js';

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

  async list({
    skip = 0,
    take = 20,
    orderBy = 'createdAt',
    sortDirection = 'desc',
    filter,
    sort,
  }: {
    skip?: number;
    take?: number;
    orderBy?: string;
    sortDirection?: 'asc' | 'desc';
    filter?: any;
    sort?: string[];
  }) {
    const parsedSort = parseSortValue(sort, orderBy, sortDirection);
    const where = buildFilterWhere(filter);

    const [items, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take,
        orderBy: { [parsedSort.field]: parsedSort.direction },
      }),
      prisma.task.count({ where }),
    ]);

    const hydratedItems = await enrichListItems(items, {
      company: {
        ids: items.map((item) => item.companyId),
        fetch: () => prisma.company.findMany({
          where: { id: { in: items.map((item) => item.companyId).filter((id): id is number => id != null) } },
          select: { id: true, name: true },
        }),
      },
      contact: {
        ids: items.map((item) => item.pointOfContact),
        fetch: () => prisma.contact.findMany({
          where: { id: { in: items.map((item) => item.pointOfContact).filter((id): id is number => id != null) } },
          select: { id: true, fullName: true },
        }),
      },
      user: {
        ids: items.flatMap((item) => [item.createdBy, item.updatedBy]),
        fetch: () => prisma.user.findMany({
          where: { id: { in: items.flatMap((item) => [item.createdBy, item.updatedBy]).filter((id): id is number => id != null) } },
          select: { id: true, firstName: true, lastName: true, fullName: true },
        }),
      },
    });

    return { items: hydratedItems, total };
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
