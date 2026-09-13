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

const coerceFilterValue = (field: string, value: any, operator?: string) => {
  if (value === null || value === undefined || value === '') return value;

  const numericOperators = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'notin'];
  const isNumericField = /(?:^|[A-Z])Id$|(?:^|[A-Z])Count$|^(?:skip|take|page|count|total|amount|price|cost|quantity|miles|year|month|day)$/i.test(field);

  if (typeof value === 'string') {
    const trimmed = value.trim();
    const numericLike = /^-?\d+(?:\.\d+)?$/.test(trimmed);
    if ((numericOperators.includes(operator ?? '') || isNumericField) && numericLike) {
      return Number(trimmed);
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'string') {
        const trimmed = item.trim();
        return (numericOperators.includes(operator ?? '') || isNumericField) && /^-?\d+(?:\.\d+)?$/.test(trimmed)
          ? Number(trimmed)
          : item;
      }
      return item;
    });
  }

  return value;
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
    const value = coerceFilterValue(field, node.value, operator);

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

const normalizeUserDisplayName = (user?: { firstName?: string | null; lastName?: string | null; fullName?: string | null } | null) => {
  if (!user) return null;
  if (user.fullName) return user.fullName;
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  return name || null;
};

type EnrichedListFields = {
  companyName?: string | null;
  contactName?: string | null;
  createdByName?: string | null;
  updatedByName?: string | null;
};

type EnrichableListItem = Record<string, any> & {
  companyId?: number | null;
  contactId?: number | null;
  createdBy?: number | null;
  updatedBy?: number | null;
};

export const enrichListItems = async <T extends EnrichableListItem>(
  items: T[],
  lookups?: {
    company?: { ids: Array<number | null | undefined>; fetch: () => Promise<Array<{ id: number; name?: string | null }>> };
    contact?: { ids: Array<number | null | undefined>; fetch: () => Promise<Array<{ id: number; fullName?: string | null }>> };
    user?: { ids: Array<number | null | undefined>; fetch: () => Promise<Array<{ id: number; firstName?: string | null; lastName?: string | null; fullName?: string | null }>> };
  },
): Promise<Array<T & EnrichedListFields>> => {
  if (!items.length) return items as Array<T & EnrichedListFields>;

  const isValidLookupId = (id: number | null | undefined): id is number => typeof id === 'number' && Number.isFinite(id);

  const companyIds = [...new Set((lookups?.company?.ids ?? []).filter(isValidLookupId))];
  const contactIds = [...new Set((lookups?.contact?.ids ?? []).filter(isValidLookupId))];
  const userIds = [...new Set((lookups?.user?.ids ?? []).filter(isValidLookupId))];

  const resolveLookup = async <R>(loader?: () => Promise<R[]>) => {
    if (!loader) return [] as R[];
    try {
      return await loader();
    } catch {
      return [] as R[];
    }
  };

  const [companyEntries, contactEntries, userEntries] = await Promise.all([
    resolveLookup(lookups?.company && companyIds.length ? lookups.company.fetch : undefined),
    resolveLookup(lookups?.contact && contactIds.length ? lookups.contact.fetch : undefined),
    resolveLookup(lookups?.user && userIds.length ? lookups.user.fetch : undefined),
  ]);

  const companyMap = new Map(companyEntries.map((company) => [company.id, company.name ?? null]));
  const contactMap = new Map(contactEntries.map((contact) => [contact.id, contact.fullName ?? null]));
  const userMap = new Map(userEntries.map((user) => [user.id, normalizeUserDisplayName(user)]));

  return items.map((item): T & EnrichedListFields => {
    const nextItem: T & EnrichedListFields = { ...item };

    if (item.companyId != null) {
      nextItem.companyName = companyMap.get(Number(item.companyId)) ?? null;
    }

    if (item.contactId != null) {
      nextItem.contactName = contactMap.get(Number(item.contactId)) ?? null;
    }

    if (item.createdBy != null) {
      nextItem.createdByName = userMap.get(Number(item.createdBy)) ?? null;
    }

    if (item.updatedBy != null) {
      nextItem.updatedByName = userMap.get(Number(item.updatedBy)) ?? null;
    }

    return nextItem;
  });
};
