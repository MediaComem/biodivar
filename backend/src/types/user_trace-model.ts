import { CoordinateModel } from './coordinate-model';

export interface UserTraceModel {
  id?: number;
  creation_date?: Date;
  update_date?: Date;
  deleted_date?: Date;
  author: number;
  is_public: boolean;
  coordinate: CoordinateModel;
  biovers: number;
}
