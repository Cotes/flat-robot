// (c) Telefonica Innovación Alpha. All rights reserved

import {MemoryFlatRepository} from "../../../src/infrastructure/database/memory/memory-flat.repository";
import {FakeFlatProvider} from "../../../src/infrastructure/provider/fake-flat.provider";
import {SearchService} from "../../../src/application/flat/search.service";
import {Flat} from "../../../src/domain/flat/flat.model";

describe("SearchService", () => {

  let sut: SearchService;
  let flats: Flat[], flatRepository: MemoryFlatRepository, flatProvider: FakeFlatProvider;

  beforeEach(() => {
    flats = [
      Flat.create(1, "description 1", {a: "a", b: 1}, ["url1", "url2"]),
      Flat.create(2, "description 2", {a: "a", b: 2}, ["url1", "url2"])
    ];
    flatRepository = new MemoryFlatRepository();
    flatProvider = new FakeFlatProvider(flats);
    sut = new SearchService(flatRepository, flatProvider);
  });

  describe("first execution", () => {
    it("should save all flats from the provider in the database", async (done) => {
      await sut.execute();
      expect(await flatRepository.all().length).toBe(flats.length);
      done()
    });
  });

  describe("when new flats are discovered", () => {
    it("should return them", async (done) => {
      // first execution
      await sut.execute();

      const newFlats = [
        Flat.create(3, "description 3", {a: "a", b: 3}, ["url1", "url2"])
      ];
      const newFlatProvider = new FakeFlatProvider(newFlats);
      sut = new SearchService(flatRepository, newFlatProvider);
      const flatsDiscovered = await sut.execute();
      expect(flatsDiscovered.length).toBe(1);
      done()
    });
  });
});
