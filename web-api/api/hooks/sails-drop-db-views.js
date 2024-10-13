/**
 * sails-drop-db-views
 *
 * In order to support database views in sails, one needs to drop views before
 * the ORM loads, otherwise sails won't know what to do with the models defined
 * in models/views.  Here we read the config/db directory an iterate over the
 * filenames to create and execute a drop view query.
 */

module.exports = function (sails) {
  return {
    initialize: async function (next) {
      sails.after("hook:blueprints:loaded", async function () {
        const query = `DROP VIEW IF EXISTS view_company_list,view_contact_list,view_inventory_list,view_quote_list`;

        await sails.sendNativeQuery(query);

        next();
      });
    },
  };
};
