import { PositionModel } from "./position-model";

export interface SymbolModel {
  id?: number;
  media_type: string;
  url: string;
  media_type_ar?: string;
  ar_url?: string;
  media_type_audio?: string;
  audio_url: string;
  is_facing_user: boolean;
  is_visible: boolean;
  is_visible_ar: boolean;
  audio_autoplay: boolean;
  audio_loop: boolean;
  audio_distance: number;
  autoplay: boolean;
  loop: boolean;
  scale: number;
  wireframe: boolean;
  amplitude: number;
  creation_date?: Date;
  update_date?: Date;
  deleted_date?: Date;
  poi_id?: number;
  position?: PositionModel;
}
