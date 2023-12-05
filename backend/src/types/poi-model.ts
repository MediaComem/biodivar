import { CoordinateModel } from "./coordinate-model";
import { MediaModels } from "./media_model";
import { UserModel } from "./user-model";

export interface PoiModel {
  id?: number;
  title?: string;
  subtitle?: string;
  author: number;
  creation_date: Date;
  update_date?: Date;
  deleted_date?: Date;
  last_contributor?: number;
  biovers: number;
  scope: number;
  extrusion: number;
  radius: number;
  style_type: string;
  style_stroke_width: number;
  stroke_color: string;
  stroke_opacity: number;
  fill_type: boolean;
  fill_color: string;
  fill_opacity: number;
  amplitude: number;
  wireframe: boolean;
  trigger_mode: string;
  map_url?: string,
  map_media_type?: string,
  elevation: number,
  metadata?: string;
  coordinate?: CoordinateModel;
  media?: MediaModels;
  user?: UserModel;
  last_contributor_fk?: UserModel;
}

export interface PoiModels extends Array<PoiModel> {}
