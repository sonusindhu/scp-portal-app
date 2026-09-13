import { prisma } from '../../config/database.js';
import { buildFilterWhere, enrichListItems, parseSortValue } from '../../common/utils/list-query.js';

export class CompanyRepository {
  async findById(id: number) {
    return prisma.company.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.company.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllNames() {
    return prisma.company.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
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
      prisma.company.findMany({
        where,
        skip,
        take,
        orderBy: { [parsedSort.field]: parsedSort.direction },
      }),
      prisma.company.count({ where }),
    ]);

    const hydratedItems = await enrichListItems(items, {
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
    name: string;
    email: string;
    type?: string | null;
    status?: string | null;
    phone?: string | null;
    extension?: string | null;
    address1?: string | null;
    address2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    country?: string | null;
    employeesCount?: number | null;
    revenue?: number | null;
    mainContactId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.company.create({
      data,
    });
  }

  async update(id: number, data: {
    name?: string;
    email?: string;
    type?: string | null;
    status?: string | null;
    phone?: string | null;
    extension?: string | null;
    address1?: string | null;
    address2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    country?: string | null;
    employeesCount?: number | null;
    revenue?: number | null;
    mainContactId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
  }) {
    return prisma.company.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.company.delete({
      where: { id },
    });
  }

  async deleteRange(ids: number[]) {
    return prisma.company.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async findByEmail(email: string) {
    return prisma.company.findUnique({
      where: { email },
    });
  }

  async findByName(name: string) {
    return prisma.company.findUnique({
      where: { name },
    });
  }
}
