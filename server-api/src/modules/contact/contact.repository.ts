import { prisma } from '../../config/database.js';
import { buildFilterWhere, parseSortValue } from '../../common/utils/list-query.js';

export class ContactRepository {
  async findById(id: number) {
    return prisma.contact.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByEmail(email: string) {
    return prisma.contact.findFirst({
      where: { email },
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
      prisma.contact.findMany({
        where,
        skip,
        take,
        orderBy: { [parsedSort.field]: parsedSort.direction },
      }),
      prisma.contact.count({ where }),
    ]);

    return { items, total };
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    companyId: number;
    status?: string | null;
    department?: string | null;
    jobTitle?: string | null;
    phone?: string | null;
    extension?: string | null;
    address1?: string | null;
    address2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    country?: string | null;
    birthDate?: string | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.contact.create({ data });
  }

  async update(id: number, data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    companyId?: number;
    status?: string | null;
    department?: string | null;
    jobTitle?: string | null;
    phone?: string | null;
    extension?: string | null;
    address1?: string | null;
    address2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    country?: string | null;
    birthDate?: string | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.contact.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.contact.delete({
      where: { id },
    });
  }

  async deleteRange(ids: number[]) {
    return prisma.contact.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
