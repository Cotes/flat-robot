// (c) Telefonica Innovación Alpha. All rights reserved

import {FlatRepository} from "../../domain/flat/flat.repository";
import {FlatProvider} from "../../domain/flat/flat.provider";
import {Flat} from "../../domain/flat/flat.model";

export class SearchService {

  private flatRepository: FlatRepository;
  private flatProvider: FlatProvider;

  constructor(
    aFlatRepository: FlatRepository,
    aFlatProvider: FlatProvider
  ) {
    this.flatRepository = aFlatRepository;
    this.flatProvider = aFlatProvider;
  }

  public async execute() {
    const flats = await this.flatProvider.getFlats();
    const ids = flats.map(flat => flat.providerId);
    const storedFlats = await this.flatRepository.manyFromProviderId(ids);
    const newFlats = flats.filter((flat: Flat) =>
      !storedFlats.some((storedFlat: Flat) => storedFlat.providerId === flat.providerId));
    this.flatRepository.saveMany(newFlats);
    return newFlats;
  }
}