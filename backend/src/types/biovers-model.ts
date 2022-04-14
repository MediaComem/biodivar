import { PoiModels } from "./poi-model";

export interface BioversModel {
  id?: number;
  name: string;
  owner: number;
  creation_date: Date;
  update_date?: Date;
  deleted_date?: Date;
  is_public?: boolean;
  is_editable?: boolean,
  Poi?: PoiModels;
}

export interface BioversModels extends Array<BioversModel> {}
