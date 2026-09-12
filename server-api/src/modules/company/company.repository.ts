import { prisma } from '../../config/database.js';

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

  async list({ skip = 0, take = 20, orderBy = 'createdAt', sortDirection = 'desc' }: {
    skip?: number;
    take?: number;
    orderBy?: string;
    sortDirection?: 'asc' | 'desc';
  }) {
    const [items, total] = await Promise.all([
      prisma.company.findMany({
        skip,
        take,
        orderBy: { [orderBy]: sortDirection },
      }),
      prisma.company.count(),
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
