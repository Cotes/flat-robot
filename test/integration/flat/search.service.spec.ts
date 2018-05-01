// (c) Telefonica Innovación Alpha. All rights reserved

import {FakeFlatProvider} from "../../../src/infrastructure/provider/fake-flat.provider";
import {SearchService} from "../../../src/application/flat/search.service";
import {FotocasaFlatProvider} from "../../../src/infrastructure/provider/fotocasa-flat.provider";
import {MongoConnectionPool} from "../../../src/infrastructure/database/mongo/mongo-connection-pool";
import {MongoFlatRepository} from "../../../src/infrastructure/database/mongo/mongo-flat.repository";

describe("SearchService", () => {

  let sut: SearchService;
  let flatRepository: MongoFlatRepository, flatProvider: FakeFlatProvider;
  let database: any, collection: any;

  beforeAll(async done => {
    try {
      await MongoConnectionPool.init();
      database = MongoConnectionPool.getDatabaseConnection("testdb");
      collection = database.collection("flatstest");
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  beforeEach(() => {
    flatRepository = new MongoFlatRepository(collection);
    flatProvider = new FakeFlatProvider();
    // flatProvider = new FotocasaFlatProvider();
    sut = new SearchService(flatRepository, flatProvider);
  });

  afterEach(async done => {
    try {
      await database.dropCollection("flatstest");
      done()
    } catch (err) {
      done.fail(err);
    }
  });

  afterAll(async done => {
    try {
      await MongoConnectionPool.close();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  describe("first execution", () => {
    it("should save at least some flats from the provider in the database", async (done) => {
      await sut.execute();
      expect(await flatRepository.all().length > 0);
      done()
    });
  });

});
