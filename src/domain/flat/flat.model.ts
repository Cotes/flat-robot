// (c) Telefonica Innovación Alpha. All rights reserved

export class Flat {

  public providerId: number;
  private description: string;
  private features: any;
  private images: string[];

  constructor(
    aProviderId: number,
    aDescription: string,
    someFeatures: any,
    someImages: string[]
  ) {
    this.providerId = aProviderId;
    this.description = aDescription;
    this.features = someFeatures;
    this.images = someImages;
  }

  static create(providerId: number, description: string, features: any, images: string[]) {
    return new Flat(providerId, description, features, images);
  }

  static createFromObject(obj: any) {
    return new Flat(obj.providerId, obj.description, obj.features, obj.images);
  }
}
