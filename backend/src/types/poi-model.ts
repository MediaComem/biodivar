export interface PoiModel {
  id?: number;
  title?: string;
  title_is_visible?: boolean;
  subtitle?: string;
  subtitle_is_visible?: boolean;
  autor: number;
  creation_date: Date;
  update_data?: Date;
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
}

export interface PoiModels extends Array<PoiModel> {}
