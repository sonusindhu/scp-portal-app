import { prisma } from '../../config/database.js';
import { buildFilterWhere, enrichListItems, parseSortValue } from '../../common/utils/list-query.js';

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
      prisma.note.findMany({
        where,
        skip,
        take,
        orderBy: { [parsedSort.field]: parsedSort.direction },
      }),
      prisma.note.count({ where }),
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
        ids: items.map((item) => item.contactId),
        fetch: () => prisma.contact.findMany({
          where: { id: { in: items.map((item) => item.contactId).filter((id): id is number => id != null) } },
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
