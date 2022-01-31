export interface CoordinateModel {
  id?: number;
  long: number;
  lat: number;
  alt: number;
  creation_date?: Date;
  update_date?: Date;
  deleted_date?: Date;
  poi_id?: number;
}

export interface CoordinateModels extends Array<CoordinateModel> {}