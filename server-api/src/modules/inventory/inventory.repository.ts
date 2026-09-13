import { prisma } from '../../config/database.js';
import { buildFilterWhere, parseSortValue } from '../../common/utils/list-query.js';

export class InventoryRepository {
  async findById(id: number) {
    return prisma.inventory.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.inventory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByTrackingNumber(trackingNumber: string) {
    return prisma.inventory.findFirst({
      where: { trackingNumber },
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
      prisma.inventory.findMany({
        where,
        skip,
        take,
        orderBy: { [parsedSort.field]: parsedSort.direction },
      }),
      prisma.inventory.count({ where }),
    ]);

    return { items, total };
  }

  async create(data: {
    trackingNumber: string;
    companyId: number;
    type?: string | null;
    deviceType?: string | null;
    status?: string | null;
    length?: number | null;
    width?: number | null;
    height?: number | null;
    lwhType?: string | null;
    weight?: number | null;
    weightType?: string | null;
    location?: string | null;
    notes?: string | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
    packageId?: string | null;
  }) {
    return prisma.inventory.create({ data });
  }

  async update(id: number, data: {
    trackingNumber?: string;
    companyId?: number;
    type?: string | null;
    deviceType?: string | null;
    status?: string | null;
    length?: number | null;
    width?: number | null;
    height?: number | null;
    lwhType?: string | null;
    weight?: number | null;
    weightType?: string | null;
    location?: string | null;
    notes?: string | null;
    createdBy?: number | null;
    updatedBy?: number | null;
    isDeleted?: boolean;
    packageId?: string | null;
  }) {
    return prisma.inventory.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.inventory.delete({
      where: { id },
    });
  }

  async deleteRange(ids: number[]) {
    return prisma.inventory.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
