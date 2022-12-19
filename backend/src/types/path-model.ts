import { CoordinateModel } from "./coordinate-model";

export interface PathModel {
  id?: number;
  author: number;
  creation_date: Date;
  update_date?: Date;
  deleted_date?: Date;
  last_contributor?: number;
  biovers: number;
  style_type: string;
  style_stroke_width: number;
  stroke_color: string;
  stroke_opacity: number;
  elevation: number;
  amplitude: number;
  style_is_visible: boolean;
  scope: number;
  metadata?: string;
  coordinate?: Array<CoordinateModel>;
}

export interface PathModels extends Array<PathModel> {}
