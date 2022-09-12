import { PositionModel } from "./position-model";

export interface MediaModel {
    id?: number;
    text?: string;
    media_type?: string;
    url?: string;
    is_facing: boolean;
    autoplay: boolean;
    loop: boolean;
    scale: number;
    amplitude: number;
    metadata?: string;
    creation_date?: Date;
    update_date?: Date;
    deleted_date?: Date;
    poi_id?: number;
    position?: PositionModel;
  }
  
  export interface MediaModels extends Array<MediaModel> {}