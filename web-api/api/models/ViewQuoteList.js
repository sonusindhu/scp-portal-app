/**
 * ViewQuoteList.js
 *
 * @description :: A model definition for the quote list view in the database.
 *                 Matches the columns returned by the SQL view.
 */

module.exports = {
  tableName: 'view_quote_list', // Your DB view name
  primaryKey: 'id',

  attributes: {
    id: { type: 'number', columnType: 'int', autoIncrement: true },
    quoteNumber: { type: 'string', maxLength: 50 },
    name: { type: 'string', maxLength: 50 },
    service: { type: 'string', maxLength: 50 },
    transportMode: { type: 'string', maxLength: 50 },
    status: { type: 'string', maxLength: 10 },
    totalCost: { type: 'number' },
    totalProfit: { type: 'number' },
    expiryDate: { type: 'ref', columnType: 'datetime' },
    totalMiles: { type: 'number' },
    company: { type: 'number', columnType: 'int' },
    companyName: { type: 'string' }, // from join with companies
    contact: { type: 'number', columnType: 'int' },
    contactName: { type: 'string' }, // from join with contacts
    createdBy: { type: 'number', columnType: 'int' },
    updatedBy: { type: 'number', columnType: 'int' },
    createdByName: { type: 'string' }, // from join with users
    updatedByName: { type: 'string' }, // from join with users
    createdAt: { type: 'ref', columnType: 'datetime' },
    updatedAt: { type: 'ref', columnType: 'datetime' },
    isDeleted: { type: 'boolean' }
  },

  datastore: 'default',
  migrate: 'safe' // read-only view
};