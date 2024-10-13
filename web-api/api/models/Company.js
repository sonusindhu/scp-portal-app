/**
 * Company.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const AuthService = require("../services/AuthService");

module.exports = {
  tableName: "companies",
  attributes: {
    name: {
      type: "string",
      // unique: true,
      required: true,
      maxLength: 200,
    },
    email: {
      type: "string",
      required: true,
      // unique: true,
      isEmail: true,
      maxLength: 250,
    },
    type: {
      type: "string",
      maxLength: 15,
      allowNull: true,
    },
    status: {
      type: "string",
      maxLength: 10,
      allowNull: true,
    },
    phone: {
      type: "string",
      maxLength: 15,
      allowNull: true,
    },
    extension: {
      type: "string",
      maxLength: 5,
      allowNull: true,
    },
    address1: {
      type: "string",
      maxLength: 100,
      allowNull: true,
    },
    address2: {
      type: "string",
      maxLength: 100,
      allowNull: true,
    },
    city: {
      type: "string",
      maxLength: 50,
      allowNull: true,
    },
    zipcode: {
      type: "string",
      maxLength: 10,
      allowNull: true,
    },
    state: {
      type: "string",
      maxLength: 50,
      allowNull: true,
    },
    country: {
      type: "string",
      maxLength: 50,
      allowNull: true,
    },
    employeesCount: {
      type: "number",
      allowNull: true,
    },
    revenue: {
      type: "number",
      allowNull: true,
    },
    mainContact: {
      model: "contact",
    },
    createdBy: {
      model: "user",
    },
    updatedBy: {
      model: "user",
    },
    isDeleted: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },

    // relation
    contacts: {
      collection: "contact",
      via: "companyId",
    },
  },
};
