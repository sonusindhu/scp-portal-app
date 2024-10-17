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
        // const company_view = `CREATE OR REPLACE VIEW view_company_list as select c.*, uc."fullName" AS createdByName,up."fullName" AS updatedByName, cn."fullName" as mainContactName from companies as c left join users uc on uc.id = c."createdBy" left join users up on uc.id = c."updatedBy" left join contacts cn on cn.id = c."mainContact" GROUP BY c.id;`;
        const company_view = `
        
        CREATE OR REPLACE VIEW view_company_list AS 
          SELECT 
              c.*, 
              uc."fullName" AS createdByName, 
              up."fullName" AS updatedByName, 
              cn."fullName" AS mainContactName 
          FROM 
              companies AS c 
          LEFT JOIN 
              users AS uc ON uc.id = c."createdBy" 
          LEFT JOIN 
              users AS up ON up.id = c."updatedBy" 
          LEFT JOIN 
              contacts AS cn ON cn.id = c."mainContact" 
          GROUP BY 
              c.id, 
              uc."fullName", 
              up."fullName", 
              cn."fullName";

        `;

        // const contact_view = `CREATE OR REPLACE VIEW view_contact_list as select cn.*, uc."fullName" AS createdByName,up."fullName" AS updatedByName, c.name as companyName from contacts as cn left join users uc on uc.id = cn."createdBy" left join users up on uc.id = cn."updatedBy" left join companies c on c.id = cn."companyId" GROUP BY cn."companyId";`;
        const contact_view = `
        
        CREATE OR REPLACE VIEW view_contact_list AS 
          SELECT 
              cn.*, 
              uc."fullName" AS createdByName, 
              up."fullName" AS updatedByName, 
              c."name" AS companyName 
          FROM 
              contacts AS cn 
          LEFT JOIN 
              users AS uc ON uc.id = cn."createdBy" 
          LEFT JOIN 
              users AS up ON up.id = cn."updatedBy" 
          LEFT JOIN 
              companies AS c ON c.id = cn."companyId" 
          GROUP BY 
              cn."id", 
              uc."fullName", 
              up."fullName", 
              c."name", 
              cn."createdBy", 
              cn."updatedBy", 
              cn."companyId";

        `;

        // const inventory_view = `CREATE OR REPLACE VIEW view_inventory_list as select i.*, uc."fullName" AS createdByName, up."fullName" AS updatedByName, c.name AS companyName from inventories as i left join companies as c on c.id = i.company left join users as uc on uc.id = i."createdBy" left join users as up on up.id = i."updatedBy" GROUP BY up.id;`;
        const inventory_view = `
        
        CREATE OR REPLACE VIEW view_inventory_list AS 
          SELECT 
              i.*, 
              uc."fullName" AS createdByName, 
              up."fullName" AS updatedByName, 
              c."name" AS companyName 
          FROM 
              inventories AS i 
          LEFT JOIN 
              companies AS c ON c.id = i."company" 
          LEFT JOIN 
              users AS uc ON uc.id = i."createdBy" 
          LEFT JOIN 
              users AS up ON up.id = i."updatedBy" 
          GROUP BY 
              i."id", 
              uc."fullName", 
              up."fullName", 
              c."name", 
              i."company", 
              i."createdBy", 
              i."updatedBy";

        `;

        // const quote_view = `CREATE OR REPLACE VIEW view_quote_list as select q.*, uc."fullName" AS createdByName, up."fullName" AS updatedByName, c.name AS companyName, cn."fullName" as contactName from quotes as q left join companies as c on c.id = q.company left join contacts as cn on cn.id = q.contact left join users as uc on uc.id = q."createdBy" left join users as up on up.id = q."updatedBy" GROUP BY up.id;`;
        const quote_view = `
        
        CREATE OR REPLACE VIEW view_quote_list AS 
          SELECT 
              q.*, 
              uc."fullName" AS createdByName, 
              up."fullName" AS updatedByName, 
              c."name" AS companyName, 
              cn."fullName" AS contactName 
          FROM 
              quotes AS q 
          LEFT JOIN 
              companies AS c ON c.id = q."company" 
          LEFT JOIN 
              contacts AS cn ON cn.id = q."contact" 
          LEFT JOIN 
              users AS uc ON uc.id = q."createdBy" 
          LEFT JOIN 
              users AS up ON up.id = q."updatedBy" 
          GROUP BY 
              q."id", 
              uc."fullName", 
              up."fullName", 
              c."name", 
              cn."fullName", 
              q."company", 
              q."contact", 
              q."createdBy", 
              q."updatedBy";


        `;

        await sails.sendNativeQuery(company_view);
        await sails.sendNativeQuery(contact_view);
        await sails.sendNativeQuery(inventory_view);
        await sails.sendNativeQuery(quote_view);

        next();
      });
    },
  };
};
