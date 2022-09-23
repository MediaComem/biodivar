export function getPoiColumns() {
    return {
      'coordinate': true,
      'title': true,
      'subtitle': true,
      'created_date': true,
      'author': true,
      'updated_date': true,
      'contributor': true,
      'scope': true,
      'trigger': true,
      'ar_file_name': true,
      'ar_visibility': true,
      'ar_is_facing': true,
      'symbol_wireframe': true,
      'autoplay': true,
      'loop': true,
      'scale': true,
      'symbol_position': true,
      'symbol_animation': true,
      'audio_file': true,
      'audio_autoplay': true,
      'audio_loop': true,
      'audio_scope': true,
      'icon_file': true,
      'is_visible': true,
      'symbol_created_date': true,
      'symbol_updated_date': true,
      'style_type': true,
      'extrusion': true,
      'radius': true,
      'position': true,
      'stroke_width': true,
      'stroke_color': true,
      'stroke_opacity': true,
      'wireframe': true,
      'fill_color': true,
      'fill_opacity': true,
      'animation': true,
      'metadata': true,
    }
  }

export function getPathColumns() {
  return {
    'scope': true,
    'created_date': true,
    'author': true,
    'updated_date': true,
    'contributor': true,
    'elevation': true,
    'animation': true,
    'stroke_width': true,
    'style_type': true,
    'coordinate': true,
  }
}


export function getTracesColumns() {
  return {
    'created_date': true,
    'author': true,
    'gps_accuracy': true,
    'coordinate': true,
  }
}