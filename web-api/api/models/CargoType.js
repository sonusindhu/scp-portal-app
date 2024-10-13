/**
 * CargoType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "cargo_types",
  attributes: {
    name: {
      type: "string",
      maxLength: 30,
    },
  },
};
