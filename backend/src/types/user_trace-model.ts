import { CoordinateModel } from './coordinate-model';

export interface UserTraceModel {
  id?: number;
  creation_date?: Date;
  deleted_date?: Date;
  author: number;
  is_public: boolean;
  coordinate: CoordinateModel;
  gps_accuracy: number;
  biovers: number;
}
