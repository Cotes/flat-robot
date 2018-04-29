// (c) Telefonica Innovación Alpha. All rights reserved

import {Flat} from "./flat.model";

export interface FlatProvider {
  getFlats(): Promise<Flat[]>;
}