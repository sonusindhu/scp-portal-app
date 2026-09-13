import { prisma } from '../../config/database.js';
import { buildFilterWhere, enrichListItems, parseSortValue } from '../../common/utils/list-query.js';

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
      prisma.quote.findMany({
        where,
        skip,
        take,
        orderBy: { [parsedSort.field]: parsedSort.direction },
      }),
      prisma.quote.count({ where }),
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
