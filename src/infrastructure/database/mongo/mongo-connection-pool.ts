// (c) Telefonica Innovación Alpha. All rights reserved
import {Db} from "mongodb";

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

export class MongoConnectionPool {

  private static database;
  private static uri: string = "mongodb://localhost:27017";
  private static options = {
    socketTimeoutMS: 0,
    connectTimeoutMS: 10000,
    keepAlive: true,
    poolSize: 10,
    reconnectTries: 30
  };

  public static async init() {
    try {
      MongoConnectionPool.database = await MongoClient.connect(MongoConnectionPool.uri, MongoConnectionPool.options);
      if (!MongoConnectionPool.database) {
        throw new Error("No database");
      }
    } catch(err) {
      console.log(err);
      throw err;
    }
  }

  public static getDatabaseConnection(databaseName: string): Db {
    if (!MongoConnectionPool.database) {
      throw Error("No database connection!");
    }
    return MongoConnectionPool.database.db(databaseName);
  }

  public static close(): Promise<any> {
    return new Promise((resolve, reject) => {
      MongoConnectionPool.database.close(true, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    })
  }

}