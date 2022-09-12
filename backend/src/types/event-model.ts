import { CoordinateModel } from "./coordinate-model";

export interface EventModel {
  id?: number;
  creation_date?: Date;
  deleted_date?: Date;  
  author: number;
  biovers: number;
  coordinate: CoordinateModel;
  gps_accuracy: number;
  data: string;
}
