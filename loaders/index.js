import dbLoader from "./dbLoader.js";
import expressLoader from "./expressLoader.js";


/**
 * This module implements the app initiallizer, when the server starts this module runs first.
 * To initialize and configure the different services like express App instance, Database connection etc.
 */

export default async (app, server) => {
  console.log("Initializing database...");
  await dbLoader(server);

  console.log("Initializing Express App Instance...");
  await expressLoader(app);
  console.log("Express Application Initialized Successfuly.");

  
};
