import { prisma } from '../../config/database.js';
import { buildFilterWhere, enrichListItems, parseSortValue } from '../../common/utils/list-query.js';

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
      prisma.email.findMany({
        where,
        skip,
        take,
        orderBy: { [parsedSort.field]: parsedSort.direction },
      }),
      prisma.email.count({ where }),
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

  async deleteRange(ids: number[]) {
    return prisma.email.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
