import mongoose from "mongoose";
import { logger } from "../../loggers/winston";

export const connect = async () => {
  try {
    // Set password options if in development and mongoose logging
    let options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    };

    // If in development, set username and password and mongoose debugger
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", process.env.MONGOOOSE_DEBUG === "true" || false);
      options.user = process.env.MONGODB_USER;
      options.pass = process.env.MONGODB_PASS;
    }

    // If in production, just connect to Atlas
    await mongoose.connect(process.env.MONGODB_URI, options);
  } catch (err) {
    console.log("Could not connect to DB.");
    console.log(err);
    process.exit(1);
  }

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.log("Error occured in MongoDB.", err);
  });

  db.on("disconnected", () => {
    console.log("Connection to MongoDB closed.");
  });

  return db;
};
