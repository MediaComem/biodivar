import { PoiModel } from "./poi-model";

export interface GeojsonPoisModel {
    type: string,
    geometry: Object,
    properties: PoiModel
}