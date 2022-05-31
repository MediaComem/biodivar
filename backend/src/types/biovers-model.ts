import { PathModels } from "./path-model";
import { PoiModels } from "./poi-model";
import { UserModel } from "./user-model";

export interface BioversModel {
  id?: number;
  name: string;
  description?: string;
  owner: number;
  creation_date: Date;
  update_date?: Date;
  deleted_date?: Date;
  is_public?: boolean;
  is_editable?: boolean;
  Poi?: PoiModels;
  Path?: PathModels;
  User?: UserModel;
}

export interface BioversModels extends Array<BioversModel> {}
