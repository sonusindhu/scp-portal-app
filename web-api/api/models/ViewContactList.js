/**
 * ViewContactList.js
 *
 * @description :: A model definition for the contact list view in the database.
 *                 This should match the columns returned by your SQL view.
 */

module.exports = {
  tableName: 'view_contact_list', // The name of your SQL view
  primaryKey: 'id',

  attributes: {
    id: { type: 'number', columnType: 'int', autoIncrement: true },
    firstName: { type: 'string', maxLength: 30 },
    lastName: { type: 'string', maxLength: 30 },
    fullName: { type: 'string', maxLength: 100 },
    email: { type: 'string', maxLength: 250 },
    companyId: { type: 'number', columnType: 'int' },
    companyName: { type: 'string' }, // extra column from join
    status: { type: 'string', maxLength: 10 },
    department: { type: 'string', maxLength: 50 },
    jobTitle: { type: 'string', maxLength: 50 },
    phone: { type: 'string', maxLength: 15 },
    extension: { type: 'string', maxLength: 5 },
    address1: { type: 'string', maxLength: 100 },
    address2: { type: 'string', maxLength: 100 },
    city: { type: 'string', maxLength: 50 },
    zipcode: { type: 'string', maxLength: 10 },
    state: { type: 'string', maxLength: 50 },
    country: { type: 'string', maxLength: 50 },
    birthDate: { type: 'string', maxLength: 15 },
    isDeleted: { type: 'boolean' },
    createdBy: { type: 'number', columnType: 'int' },
    updatedBy: { type: 'number', columnType: 'int' },
    createdByName: { type: 'string' }, // from join with users
    updatedByName: { type: 'string' }, // from join with users
    createdAt: { type: 'ref', columnType: 'datetime' },
    updatedAt: { type: 'ref', columnType: 'datetime' }
  },

  datastore: 'default',
  migrate: 'safe' // read-only view
};
