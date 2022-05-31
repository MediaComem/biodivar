import { Biovers } from "@prisma/client";
import { PathModel } from "../types/path-model";
import { PoiModel } from "../types/poi-model";

export const preparePoisFromBioversDuplication = (biovers: Biovers, poi: PoiModel, author: number): PoiModel => {
    delete poi.id;
    poi.author = author;
    delete poi.last_contributor;
    poi.biovers = biovers.id;
    if (typeof poi.subtitle == 'object') {
      poi.subtitle = '';
    }
    if (typeof poi.metadata == 'object') {
      poi.metadata = '';
    }
    const symbol = poi.symbol;
    if (symbol
    && Object.keys(symbol).length === 0
    && Object.getPrototypeOf(symbol) === Object.prototype) {
      poi.symbol = undefined;
    }
    const coordinate = poi.coordinate;
    if (coordinate
    && Object.keys(coordinate).length === 0
    && Object.getPrototypeOf(coordinate) === Object.prototype) {
      poi.coordinate = undefined;
    }

    return poi;
}

export const preparePathsFromBioversDuplication = (biovers: Biovers, path: PathModel, author: number): PathModel => {
    delete path.id;
    path.author = author;
    delete path.last_contributor;
    path.biovers = biovers.id;
    if (typeof path.metadata == 'object') {
      path.metadata = '';
    }
    const coordinate = path.coordinate;
    if (coordinate) {
      if (Object.keys(coordinate).length === 0
      && Object.getPrototypeOf(coordinate) === Object.prototype) {
        path.coordinate = undefined;
      }
      else {
        const arrayOfCoordinate = [];
        for (const keyC in Object.keys(coordinate)) {
          delete coordinate[keyC].id;
          delete coordinate[keyC].creation_date;
          delete coordinate[keyC].update_date;
          delete coordinate[keyC].deleted_date;
          delete coordinate[keyC].poi_id;
          delete coordinate[keyC].path_id;
          delete coordinate[keyC].user_trace_id;
          arrayOfCoordinate.push(coordinate[keyC])
        }
        path.coordinate = arrayOfCoordinate;
      }
    }
    return path;
} 