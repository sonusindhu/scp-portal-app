/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await User.count() == 0) {
    await User.createEach([
      {
        email: "sonupnf@gmail.com",
        fullName: "Sonu Sindhu",
        firstName: "Sonu",
        lastName: "Sindhu",
        password: "sonu@123",
      },
      {
        email: "info@sonusindhu.com",
        fullName: "Sonu Sindhu",
        firstName: "Sonu",
        lastName: "Test",
        password: "sonu@123",
      },
    ]);
  }
  //
  
  // await Company.createEach([
  //   {
  //     name: "Infosys",
  //     email: "info@infosys.com",
  //     type: "customer",
  //     status: "active",
  //     revenue: 24500,
  //     employeesCount: 201,
  //   },
  // ]);
  // await Contact.createEach([
  //   {
  //     email: "sonupnf@gmail.com",
  //     fullName: "Sonu Sindhu",
  //     firstName: "Sonu",
  //     lastName: "Sindhu",
  //     companyId: 1,
  //     status: "active",
  //     jobTitle: "Lead",
  //   },
  // ]);
  // await Inventory.createEach([
  //   {
  //     trackingNumber: "TRK11000011-1",
  //     type: "parcel",
  //     deviceType: "parcel",
  //     status: "active",
  //     company: 1,
  //     length: 10,
  //     width: 15,
  //     height: 15,
  //     weight: 105,
  //   },
  // ]);
};
