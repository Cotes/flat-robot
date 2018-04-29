// (c) Telefonica Innovación Alpha. All rights reserved

import {Flat} from "./flat.model";

export interface FlatRepository {
  save(flat: Flat);
  fromProviderId(providerId: number): Promise<Flat>;
  all(): Promise<Flat[]>;
}
