import { PositionModel } from "./position-model";

export interface MediaModel {
    id?: number;
    text?: string;
    media_type?: string;
    url?: string;
    is_facing: boolean;
    is_visible_in_radius: boolean,
    autoplay: boolean;
    loop: boolean;
    scale: number;
    amplitude: number;
    metadata?: string;
    creation_date?: Date;
    update_date?: Date;
    deleted_date?: Date;
    poi_id?: number;
    position?: any;
    content?: String;
  }
  
  export interface MediaModels extends Array<MediaModel> {}