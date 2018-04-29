// (c) Telefonica Innovación Alpha. All rights reserved

import {FlatProvider} from "../../domain/flat/flat.provider";
import {Flat} from "../../domain/flat/flat.model";

export class FakeFlatProvider implements FlatProvider {

  private flats: Flat[];

  constructor(flats: Flat[]) {
    this.flats = flats || [
      Flat.create(1, "description 1", {a: "a", b: 1}, ["url1", "url2"]),
      Flat.create(2, "description 2", {a: "a", b: 2}, ["url1", "url2"]),
      Flat.create(3, "description 3", {a: "a", b: 3}, ["url1", "url2"]),
      Flat.create(4, "description 4", {a: "a", b: 4}, ["url1", "url2"]),
      Flat.create(5, "description 5", {a: "a", b: 5}, ["url1", "url2"]),
    ];
  }

  getFlats(): Flat[] {
    return this.flats;
  }

}
