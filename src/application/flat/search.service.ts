// (c) Telefonica Innovación Alpha. All rights reserved

import {FlatRepository} from "../../domain/flat/flat.repository";
import {FlatProvider} from "../../domain/flat/flat.provider";
import {Flat} from "../../domain/flat/flat.model";

export class SearchService {

  constructor(
    private flatRepository: FlatRepository,
    private flatProvider: FlatProvider
  ) {}

  public async execute() {
    const flats = this.flatProvider.getFlats();
    flats.forEach(async (flat: Flat) => {
      const storedFlat = await this.flatRepository.fromProviderId(flat.providerId)
      if (storedFlat) {
        // Flat already exists in DB
        return;
      }

      // New flat!
      this.flatRepository.save(flat);
    })
  }
}