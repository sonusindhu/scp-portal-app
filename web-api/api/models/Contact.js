/**
 * Contact.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "contacts",
  attributes: {
    firstName: {
      type: "string",
      required: true,
      maxLength: 30,
    },
    lastName: {
      type: "string",
      required: true,
      maxLength: 30,
    },
    fullName: {
      type: "string",
      maxLength: 100,
    },
    email: {
      type: "string",
      required: true,
      // unique: true,
      isEmail: true,
      maxLength: 250,
    },
    companyId: {
      model: "company",
      required: true,
    },
    status: {
      type: "string",
      maxLength: 10,
      allowNull: true,
    },
    department: {
      type: "string",
      maxLength: 50,
      allowNull: true,
    },
    jobTitle: {
      type: "string",
      maxLength: 50,
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
    birthDate: {
      type: "string",
      maxLength: 15,
      allowNull: true,
    },
    isDeleted: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },
    createdBy: {
      model: "user",
    },
    updatedBy: {
      model: "user",
    },
  },
};
