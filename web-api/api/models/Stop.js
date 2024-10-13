/**
 * Stop.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "stops",
  attributes: {
    type: {
      type: "string",
      maxLength: 10,
    },
    city: {
      type: "string",
      maxLength: 20,
    },
    zipcode: {
      type: "string",
      maxLength: 10,
    },
    state: {
      type: "string",
      maxLength: 20,
    },
    country: {
      type: "string",
      maxLength: 20,
    },
    miles: {
      type: "number",
    },
    quoteId: {
      model: "quote",
    },
  },
};
