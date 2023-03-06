export interface MediaModel {
    id?: number;
    text?: string;
    name?: string;
    media_type?: string;
    url?: string;
    is_facing: boolean;
    is_visible_in_radius: boolean,
    is_visible_out_radius: boolean,
    autoplay: boolean;
    loop: boolean;
    scale: number;
    amplitude: number;
    distance: number,
    elevation: number,
    rotation: number,
    orientation: number,
    metadata?: string;
    creation_date?: Date;
    update_date?: Date;
    deleted_date?: Date;
    poi_id?: number;
    content?: String;
  }
  
  export interface MediaModels extends Array<MediaModel> {}