// (c) Telefonica Innovación Alpha. All rights reserved

import {Flat} from '../../../domain/flat/flat.model';
import {FlatRepository} from "../../../domain/flat/flat.repository";

export class MemoryFlatRepository implements FlatRepository {

  private flats: Flat[] = [];

  constructor() {}

  save(flat: Flat): Promise<boolean> {
    return new Promise((resolve,) => {
      this.flats.push(flat);
      resolve(true);
    });
  }

  saveMany(flats: Flat[]): Promise<boolean> {
    return new Promise((resolve) => {
      this.flats = this.flats.concat(flats);
      resolve(true);
    });
  }

  fromProviderId(providerId: number): Promise<Flat> {
    const flat = this.flats.filter(flat => flat.providerId === providerId);
    if (!flat || !flat.length) {
      return null;
    }
    return flat[0];
  }

  manyFromProviderId(providerIds: number[]): Promise<Flat[]> {
    return this.flats.filter((flat: Flat) => providerIds.includes(flat.providerId));
  }

  all(): Promise<Flat[]> {
    return this.flats;
  }
}
