/**
 * ViewInventoryList.js
 *
 * @description :: Read-only Waterline model for the inventory list database view.
 */

module.exports = {
  tableName: 'view_inventory_list', // exact DB view name
  primaryKey: 'id',

  attributes: {
    id: { type: 'number', columnType: 'int', autoIncrement: true },
    packageId: { type: 'string', maxLength: 50 },
    trackingNumber: { type: 'string', maxLength: 50 },
    company: { type: 'number', columnType: 'int' },
    companyName: { type: 'string' }, // from join with companies
    type: { type: 'string', maxLength: 50 },
    deviceType: { type: 'string', maxLength: 15 },
    status: { type: 'string', maxLength: 10 },
    length: { type: 'number' },
    width: { type: 'number' },
    height: { type: 'number' },
    lwhType: { type: 'string', maxLength: 10 },
    weight: { type: 'number' },
    weightType: { type: 'string', maxLength: 10 },
    location: { type: 'string', maxLength: 254 },
    notes: { type: 'string', maxLength: 254 },
    createdBy: { type: 'number', columnType: 'int' },
    createdByName: { type: 'string' }, // from join with users
    updatedBy: { type: 'number', columnType: 'int' },
    updatedByName: { type: 'string' }, // from join with users
    createdAt: { type: 'ref', columnType: 'datetime' },
    updatedAt: { type: 'ref', columnType: 'datetime' },
    isDeleted: { type: 'boolean' }
  },

  datastore: 'default',
  migrate: 'safe' // ensures no changes to the view
};
