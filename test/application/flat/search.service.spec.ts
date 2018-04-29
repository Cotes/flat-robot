// (c) Telefonica Innovación Alpha. All rights reserved

import {MemoryFlatRepository} from "../../../src/infrastructure/database/memory/memory-flat.repository";
import {FakeFlatProvider} from "../../../src/infrastructure/provider/fake-flat.provider";
import {SearchService} from "../../../src/application/flat/search.service";
import {Flat} from "../../../src/domain/flat/flat.model";

describe("SearchService", () => {
  describe("first execution", () => {
    it("should save all flats from the provider in the database", async (done) => {
      const flats = [
        Flat.create(1, "description 1", {a: "a", b: 1}, ["url1", "url2"]),
        Flat.create(2, "description 2", {a: "a", b: 2}, ["url1", "url2"])
      ];
      const flatRepository = new MemoryFlatRepository();
      const flatProvider = new FakeFlatProvider(flats);
      const sut = new SearchService(flatRepository, flatProvider);
      await sut.execute();
      expect(await flatRepository.all().length).toBe(flats.length);
      done()
    });
  });
});
