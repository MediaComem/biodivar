import { CoordinateModel } from "./coordinate-model";

export interface PathModel {
  id?: number;
  author: number;
  creation_date: Date;
  update_date?: Date;
  deleted_date?: Date;
  last_contributor?: number;
  is_public?: boolean;
  is_editable?: boolean;
  biovers: number;
  style_type: string;
  style_stroke: boolean;
  style_stroke_width: number;
  style_elevation: number;
  style_elevation_ground: number;
  style_noise: number;
  style_is_visible: boolean;
  visible_from: number;
  metadata?: string;
  coordinate?: Array<CoordinateModel>;
}

export interface PathModels extends Array<PathModel> {}
