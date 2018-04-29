// (c) Telefonica Innovación Alpha. All rights reserved

export class Flat {

  constructor(
    public providerId: number,
    private description: string,
    private features: any,
    private images: string[]
  ) {}

  static create(providerId: number, description: string, features: any, images: string[]) {
    return new Flat(providerId, description, features, images);
  }
}
