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
    initialize: function (next) {
      sails.after("hook:orm:loaded", async function () {
        const company_view = `CREATE OR REPLACE VIEW view_company_list as select c.*, uc.fullName AS createdByName,up.fullName AS updatedByName, cn.fullName as mainContactName from companies as c left join users uc on uc.id = c.createdBy left join sails_scpapi.users up on uc.id = c.updatedBy left join sails_scpapi.contacts cn on cn.id = c.mainContact GROUP BY c.id;`;

        const contact_view = `CREATE OR REPLACE VIEW view_contact_list as select cn.*, uc.fullName AS createdByName,up.fullName AS updatedByName, c.name as companyName from contacts as cn left join users uc on uc.id = cn.createdBy left join sails_scpapi.users up on uc.id = cn.updatedBy left join sails_scpapi.companies c on c.id = cn.companyId GROUP BY cn.companyId;`;

        const inventory_view = `CREATE OR REPLACE VIEW view_inventory_list as select i.*, uc.fullName AS createdByName, up.fullName AS updatedByName, c.name AS companyName from inventories as i left join companies as c on c.id = i.company left join users as uc on uc.id = i.createdBy left join users as up on up.id = i.updatedBy GROUP BY up.id;`;

        const quote_view = `CREATE OR REPLACE VIEW view_quote_list as select q.*, uc.fullName AS createdByName, up.fullName AS updatedByName, c.name AS companyName, cn.fullName as contactName from quotes as q left join companies as c on c.id = q.company left join contacts as cn on cn.id = q.contact left join users as uc on uc.id = q.createdBy left join users as up on up.id = q.updatedBy GROUP BY up.id;`;

        await sails.sendNativeQuery(company_view);
        await sails.sendNativeQuery(contact_view);
        await sails.sendNativeQuery(inventory_view);
        await sails.sendNativeQuery(quote_view);

        next();
      });
    },
  };
};
