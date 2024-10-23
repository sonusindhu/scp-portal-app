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
        const company_view = `
        CREATE OR REPLACE VIEW view_company_list as select c.*, uc.fullName AS createdByName,up.fullName AS updatedByName, cn.fullName as mainContactName from companies as c left join users uc on uc.id = c.createdBy left join users up on uc.id = c.updatedBy left join contacts cn on cn.id = c.mainContact GROUP BY c.id;
        `;

        const contact_view = `
        CREATE OR REPLACE VIEW view_contact_list as select cn.*, uc.fullName AS createdByName,up.fullName AS updatedByName, c.name as companyName from contacts as cn left join users uc on uc.id = cn.createdBy left join users up on uc.id = cn.updatedBy left join companies c on c.id = cn.companyId GROUP BY cn.companyId;
        `;

        const inventory_view = `
        CREATE OR REPLACE VIEW view_inventory_list as select i.*, uc.fullName AS createdByName, up.fullName AS updatedByName, c.name AS companyName from inventories as i left join companies as c on c.id = i.company left join users as uc on uc.id = i.createdBy left join users as up on up.id = i.updatedBy GROUP BY up.id;
        `;

        const quote_view = `
        CREATE OR REPLACE VIEW view_quote_list as select q.*, uc.fullName AS createdByName, up.fullName AS updatedByName, c.name AS companyName, cn.fullName as contactName from quotes as q left join companies as c on c.id = q.company left join contacts as cn on cn.id = q.contact left join users as uc on uc.id = q.createdBy left join users as up on up.id = q.updatedBy GROUP BY up.id;
        `;

        const dummy_data = `
        
          INSERT INTO equipments (name, createdAt) VALUES
            ('Excavators', UNIX_TIMESTAMP()),
            ('Bulldozers', UNIX_TIMESTAMP()),
            ('Cranes', UNIX_TIMESTAMP()),
            ('Backhoes', UNIX_TIMESTAMP()),
            ('Concrete Mixers', UNIX_TIMESTAMP()),
            ('Forklifts', UNIX_TIMESTAMP()),
            ('Pallet Jacks', UNIX_TIMESTAMP()),
            ('Conveyor Belts', UNIX_TIMESTAMP()),
            ('Hand Trucks', UNIX_TIMESTAMP()),
            ('Reach Trucks', UNIX_TIMESTAMP()),
            ('Tractors', UNIX_TIMESTAMP()),
            ('Plows', UNIX_TIMESTAMP()),
            ('Harvesters', UNIX_TIMESTAMP()),
            ('Seeders', UNIX_TIMESTAMP()),
            ('Sprayers', UNIX_TIMESTAMP()),
            ('Trucks', UNIX_TIMESTAMP()),
            ('Trailers', UNIX_TIMESTAMP()),
            ('Shipping Containers', UNIX_TIMESTAMP()),
            ('Cargo Vans', UNIX_TIMESTAMP()),
            ('Rail Cars', UNIX_TIMESTAMP()),
            ('Compressors', UNIX_TIMESTAMP()),
            ('Generators', UNIX_TIMESTAMP()),
            ('Welding Machines', UNIX_TIMESTAMP()),
            ('Lathes', UNIX_TIMESTAMP()),
            ('Milling Machines', UNIX_TIMESTAMP()),
            ('Computers', UNIX_TIMESTAMP()),
            ('Printers', UNIX_TIMESTAMP()),
            ('Copiers', UNIX_TIMESTAMP()),
            ('Scanners', UNIX_TIMESTAMP()),
            ('Telephones', UNIX_TIMESTAMP()),
            ('MRI Machines', UNIX_TIMESTAMP()),
            ('X-ray Machines', UNIX_TIMESTAMP()),
            ('Patient Monitors', UNIX_TIMESTAMP()),
            ('Surgical Instruments', UNIX_TIMESTAMP()),
            ('Wheelchairs', UNIX_TIMESTAMP()),
            ('Routers', UNIX_TIMESTAMP()),
            ('Switches', UNIX_TIMESTAMP()),
            ('Fiber Optic Cables', UNIX_TIMESTAMP()),
            ('Antennas', UNIX_TIMESTAMP()),
            ('Satellite Dishes', UNIX_TIMESTAMP()),
            ('Treadmills', UNIX_TIMESTAMP()),
            ('Weight Machines', UNIX_TIMESTAMP()),
            ('Exercise Bikes', UNIX_TIMESTAMP()),
            ('Ellipticals', UNIX_TIMESTAMP()),
            ('Free Weights', UNIX_TIMESTAMP()),
            ('Vacuum Cleaners', UNIX_TIMESTAMP()),
            ('Pressure Washers', UNIX_TIMESTAMP()),
            ('Floor Scrubbers', UNIX_TIMESTAMP()),
            ('Steam Cleaners', UNIX_TIMESTAMP()),
            ('Brooms and Mops', UNIX_TIMESTAMP());




            INSERT INTO accessorials (name, createdAt) VALUES
            ('Fuel Surcharge', UNIX_TIMESTAMP()),
            ('Liftgate Service', UNIX_TIMESTAMP()),
            ('Inside Delivery', UNIX_TIMESTAMP()),
            ('Residential Delivery', UNIX_TIMESTAMP()),
            ('Appointment Scheduling', UNIX_TIMESTAMP()),
            ('Storage Fees', UNIX_TIMESTAMP()),
            ('Sorting and Segregation', UNIX_TIMESTAMP()),
            ('Extra Stop Fee', UNIX_TIMESTAMP()),
            ('Hazardous Material Fee', UNIX_TIMESTAMP()),
            ('Loading/Unloading Charges', UNIX_TIMESTAMP()),
            ('Re-delivery Fee', UNIX_TIMESTAMP()),
            ('Documentation Fee', UNIX_TIMESTAMP());



            INSERT INTO commodities (name, createdAt) VALUES
            ('Wheat', UNIX_TIMESTAMP()),
            ('Corn', UNIX_TIMESTAMP()),
            ('Rice', UNIX_TIMESTAMP()),
            ('Barley', UNIX_TIMESTAMP()),
            ('Soybeans', UNIX_TIMESTAMP()),
            ('Canola', UNIX_TIMESTAMP()),
            ('Apples', UNIX_TIMESTAMP()),
            ('Oranges', UNIX_TIMESTAMP()),
            ('Bananas', UNIX_TIMESTAMP()),
            ('Potatoes', UNIX_TIMESTAMP()),
            ('Carrots', UNIX_TIMESTAMP()),
            ('Onions', UNIX_TIMESTAMP()),
            ('Cattle', UNIX_TIMESTAMP()),
            ('Pigs', UNIX_TIMESTAMP()),
            ('Sheep', UNIX_TIMESTAMP()),
            ('Crude Oil', UNIX_TIMESTAMP()),
            ('Natural Gas', UNIX_TIMESTAMP()),
            ('Coal', UNIX_TIMESTAMP()),
            ('Uranium', UNIX_TIMESTAMP()),
            ('Biofuels', UNIX_TIMESTAMP()),
            ('Gold', UNIX_TIMESTAMP()),
            ('Silver', UNIX_TIMESTAMP()),
            ('Copper', UNIX_TIMESTAMP()),
            ('Aluminum', UNIX_TIMESTAMP()),
            ('Iron Ore', UNIX_TIMESTAMP());

        `;

        await sails.sendNativeQuery(company_view);
        await sails.sendNativeQuery(contact_view);
        await sails.sendNativeQuery(inventory_view);
        await sails.sendNativeQuery(quote_view);
        await sails.sendNativeQuery(dummy_data);

        next();
      });
    },
  };
};
