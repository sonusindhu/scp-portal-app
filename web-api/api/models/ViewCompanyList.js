module.exports = {
  tableName: 'view_company_list', // exact name of your DB view
  primaryKey: 'id',               // must match the PK in your view
  attributes: {
    id: { type: 'number', columnType: 'int', autoIncrement: true },

    // Basic company fields
    name: { type: 'string' },
    status: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    extension: { type: 'string' },
    revenue: { type: 'number' },
    employeesCount: { type: 'number' },

    // Address
    address1: { type: 'string' },
    address2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zipcode: { type: 'string' },

    // Type
    type: { type: 'string' },

    // Audit fields
    createdBy: { type: 'number' },
    updatedBy: { type: 'number' },
    mainContact: { type: 'number' },

    createdByName: { type: 'string' },
    updatedByName: { type: 'string' },
    mainContactName: { type: 'string' },

    createdAt: { type: 'ref', columnType: 'datetime' },
    updatedAt: { type: 'ref', columnType: 'datetime' },
  },

  // This is a read-only DB view
  datastore: 'default',
  migrate: 'safe'
};
