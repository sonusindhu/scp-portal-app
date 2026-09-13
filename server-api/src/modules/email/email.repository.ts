import { prisma } from '../../config/database.js';
import { buildFilterWhere, parseSortValue } from '../../common/utils/list-query.js';

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

  async deleteRange(ids: number[]) {
    return prisma.email.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
