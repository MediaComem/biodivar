export interface SymbolModel {
  id?: number;
  media_type: string;
  url: string;
  ar_url: string,
  media_type_ar: string,
  elevation_ground: number;
  is_facing_user: boolean;
  is_visible: boolean;
  width: number,
  height: number,
  creation_date?: Date;
  update_date?: Date;
  deleted_date?: Date;
  poi_id?: number;
}
