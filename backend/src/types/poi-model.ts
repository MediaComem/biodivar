import { CoordinateModel } from "./coordinate-model";
import { SymbolModel } from "./symbol-model";
import { MediaModels } from "./media_model";
import { PositionModel } from "./position-model";

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
  metadata?: string;
  coordinate?: CoordinateModel;
  symbol?: SymbolModel;
  media?: MediaModels;
  position?: PositionModel;
}

export interface PoiModels extends Array<PoiModel> {}
