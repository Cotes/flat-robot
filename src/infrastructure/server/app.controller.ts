import {Get, Controller} from '@nestjs/common';
import * as rc from 'typed-rest-client/HttpClient';
import {Flat} from "../../domain/flat/flat.model";


@Controller()
export class AppController {
  @Get()
  async root(): string {
    const rest: rc.RestClient = new rc.HttpClient('rest-samples');

    const headers: any = {
      'origin': 'https://www.fotocasa.es',
      'accept-encoding': 'deflate, br',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      'accept': 'application/json, text/plain, */*'
    };
    const url: string = 'https://api.fotocasa.es/PropertySearch/Search?' +
      'combinedLocationIds=724,9,8,232,376,8019,0,1146,0&' +
      'culture=es-ES&' +
      'hrefLangCultures=ca-ES%3Bes-ES%3Bde-DE%3Ben-GB&' +
      'isNewConstruction=false&' +
      'isMap=false&' +
      'latitude=41.3854&' +
      'longitude=2.17754&' +
      'maxPrice=325000&' +
      'minRooms=2&' +
      'minSurface=60&' +
      // 'pageNumber=1&' +
      'platformId=1&' +
      // 'propertySubtypeIds=6&' +
      'propertyTypeId=2&' +
      'sortOrderDesc=true&' +
      'sortType=bumpdate&' +
      'transactionTypeId=1';
    let res: rm.HttpClientResponse = await rest.get(url, headers);

    let body = await res.readBody();
    let information = JSON.parse(body);
    this.parseFlats(information);
    let nextPage = 2;
    const total = information.count;
    for (let i = information.realEstates.length; i < total; i += information.realEstates.length) {
      const newUrl = url.concat(`&pageNumber=${nextPage}`);
      res = await rest.get(newUrl, headers);
      body = await res.readBody();
      information = JSON.parse(body);
      this.parseFlats(information);
      nextPage++;
    }
    return 'Hello World!';
  }

  private parseFlats(information: any): Flat[] {
    if (!information.realEstates) {
      return [];
    }
    const flats = information.realEstates.map(
      flat => Flat.create(
        flat.id,
        flat.description,
        flat.features,
        flat.multimedias.map(m => m.url)
      ));
    return flats;
  }
}
