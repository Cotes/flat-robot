// (c) Telefonica Innovación Alpha. All rights reserved

import {Flat} from "../../../domain/flat/flat.model";
import {FlatRepository} from "../../../domain/flat/flat.repository";

export class MongoFlatRepository implements FlatRepository {

  private collection;

  constructor(collection) {
    this.collection = collection;
  }

  async save(flat: Flat): Promise<boolean> {
    const result = await this.collection.insert(flat);
    return !!result.result.ok;
  }

  async saveMany(flats: Flat[]): Promise<boolean> {
    if (!flats || !flats.length) {
      return true;
    }
    try {
      const result = await this.collection.insertMany(flats);
      return !!result.result.ok;
    } catch(err) {
      console.log(err);
      throw err;
    }
  }

  async manyFromProviderId(providerIds: number[]): Promise<Flat[]> {
    const result = await this.collection.find({providerId: {$in: providerIds}}).toArray();
    const flats = result.map(flat => Flat.createFromObject(flat));
    return flats;
  }

  fromProviderId(providerId: number): Promise<Flat> {

  }

  async all(): Promise<Flat[]> {
    const result = await this.collection.find({}).toArray();
    return result;
  }
}
