import { CoordinateModel } from "./coordinate-model";
import { SymbolModel } from "./symbol-model";

export interface PoiModel {
  id?: number;
  title?: string;
  title_is_visible?: boolean;
  subtitle?: string;
  subtitle_is_visible?: boolean;
  author: number;
  creation_date: Date;
  update_date?: Date;
  deleted_date?: Date;
  last_contributor?: number;
  is_public?: boolean;
  is_editable?: boolean;
  biovers: number;
  radius: number;
  style_type: string;
  style_stroke: boolean;
  style_stroke_width: number;
  style_fill: boolean;
  style_elevation: number;
  style_elevation_ground: number;
  style_noise: number;
  style_is_visible: boolean;
  visible_from: number;
  trigger_mode: string;
  metadata?: string;
  coordinate?: CoordinateModel;
  symbol?: SymbolModel;
}

export interface PoiModels extends Array<PoiModel> {}
