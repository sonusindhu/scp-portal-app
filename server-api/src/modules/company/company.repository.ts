import { prisma } from '../../config/database.js';

const parseSortValue = (sort: string[] = [], fallbackField = 'createdAt', fallbackDirection: 'asc' | 'desc' = 'desc') => {
  const nextSort = sort?.[0];
  if (!nextSort) {
    return { field: fallbackField, direction: fallbackDirection };
  }

  const [field, direction] = nextSort.split(/\s+/);
  return {
    field: field || fallbackField,
    direction: direction === 'asc' || direction === 'desc' ? direction : fallbackDirection,
  };
};

const buildFilterWhere = (filterValue?: any): Record<string, any> | undefined => {
  if (!filterValue) return undefined;

  const walk = (node: any): Record<string, any> | undefined => {
    if (!node) return undefined;

    if (node.logic && Array.isArray(node.filters) && node.filters.length) {
      const children = node.filters.map(walk).filter(Boolean);
      if (!children.length) return undefined;
      return node.logic === 'or' ? { OR: children } : { AND: children };
    }

    if (!node.field) return undefined;

    const field = node.field;
    const operator = node.operator ?? 'contains';
    const value = node.value;

    switch (operator) {
      case 'eq':
        return { [field]: value };
      case 'neq':
        return { NOT: { [field]: value } };
      case 'contains':
        return { [field]: { contains: String(value), mode: 'insensitive' } };
      case 'notcontains':
        return { NOT: { [field]: { contains: String(value), mode: 'insensitive' } } };
      case 'startswith':
        return { [field]: { startsWith: String(value), mode: 'insensitive' } };
      case 'endswith':
        return { [field]: { endsWith: String(value), mode: 'insensitive' } };
      case 'gt':
        return { [field]: { gt: value } };
      case 'gte':
        return { [field]: { gte: value } };
      case 'lt':
        return { [field]: { lt: value } };
      case 'lte':
        return { [field]: { lte: value } };
      case 'isnull':
        return value ? { [field]: null } : { NOT: { [field]: null } };
      case 'isnotnull':
        return value ? { NOT: { [field]: null } } : { [field]: null };
      case 'in':
        return { [field]: { in: Array.isArray(value) ? value : [value] } };
      case 'notin':
        return { NOT: { [field]: { in: Array.isArray(value) ? value : [value] } } };
      default:
        return { [field]: { contains: String(value), mode: 'insensitive' } };
    }
  };

  return walk(filterValue);
};

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

    return { items, total };
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
