// (c) Telefonica Innovación Alpha. All rights reserved

import {Flat} from "./flat.model";

export interface FlatRepository {
  save(flat: Flat);
  saveMany(flats: Flat[]);
  fromProviderId(providerId: number): Promise<Flat>;
  manyFromProviderId(providerIds: number[]): Promise<Flat[]>;
  all(): Promise<Flat[]>;
}
