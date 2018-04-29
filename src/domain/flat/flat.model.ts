// (c) Telefonica Innovación Alpha. All rights reserved

export class Flat {

  public providerId: number;
  private description: string;
  private features: any;
  private images: string[];

  constructor(
    public providerId: number,
    private description: string,
    private features: any,
    private images: string[]
  ) {
    this.providerId = providerId;
    this.description = description;
    this.features = features;
    this.images = images;
  }

  static create(providerId: number, description: string, features: any, images: string[]) {
    return new Flat(providerId, description, features, images);
  }
}
