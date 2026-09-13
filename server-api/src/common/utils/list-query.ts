import { z } from 'zod';

export const listFilterNodeSchema: z.ZodTypeAny = z.lazy(() =>
  z.object({
    field: z.string().optional(),
    operator: z.enum([
      'eq',
      'neq',
      'contains',
      'notcontains',
      'startswith',
      'endswith',
      'gt',
      'gte',
      'lt',
      'lte',
      'isnull',
      'isnotnull',
      'in',
      'notin',
    ]).optional(),
    value: z.any().optional(),
    logic: z.enum(['and', 'or']).optional(),
    filters: z.array(listFilterNodeSchema).optional(),
  }).passthrough()
);

export const listQuerySchema = z.object({
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
  orderBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  group: z.array(z.any()).optional(),
  sort: z.array(z.string()).optional(),
  filter: z.object({
    logic: z.enum(['and', 'or']).optional(),
    filters: z.array(listFilterNodeSchema).optional(),
  }).passthrough().optional(),
});

export const buildListQuerySchema = () => listQuerySchema;

export const parseSortValue = (
  sort: string[] = [],
  fallbackField = 'createdAt',
  fallbackDirection: 'asc' | 'desc' = 'desc',
) => {
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

export const buildFilterWhere = (filterValue?: any): Record<string, any> | undefined => {
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
