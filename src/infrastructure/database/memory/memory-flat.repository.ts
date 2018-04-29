// (c) Telefonica Innovación Alpha. All rights reserved

import {Flat} from '../../../domain/flat/flat.model';
import {FlatRepository} from "../../../domain/flat/flat.repository";

export class MemoryFlatRepository implements FlatRepository {

  private flats: Flat[] = [];

  constructor() {}

  save(flat: Flat) {
    this.flats.push(flat);
  }

  fromProviderId(providerId: number): Promise<Flat> {
    const flat = this.flats.filter(flat => flat.providerId === providerId);
    if (!flat || !flat.length) {
      return null;
    }
    return flat[0];
  }

  all(): Promise<Flat[]> {
    return this.flats;
  }
}
