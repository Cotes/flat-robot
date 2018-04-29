// (c) Telefonica Innovación Alpha. All rights reserved

import {MemoryFlatRepository} from "../../../src/infrastructure/database/memory/memory-flat.repository";
import {FakeFlatProvider} from "../../../src/infrastructure/provider/fake-flat.provider";
import {SearchService} from "../../../src/application/flat/search.service";
import {FotocasaFlatProvider} from "../../../src/infrastructure/provider/fotocasa-flat.provider";

describe("SearchService", () => {

  let sut: SearchService;
  let flatRepository: MemoryFlatRepository, flatProvider: FakeFlatProvider;

  beforeEach(() => {
    flatRepository = new MemoryFlatRepository();
    flatProvider = new FotocasaFlatProvider();
    sut = new SearchService(flatRepository, flatProvider);
  });

  describe("first execution", () => {
    it("should save at least some flats from the provider in the database", async (done) => {
      await sut.execute();
      expect(await flatRepository.all().length > 0);
      done()
    }, 20000);
  });

});
