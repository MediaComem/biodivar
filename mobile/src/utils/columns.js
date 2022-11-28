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

export function getEventsColumns() {
  return {
    'created_date': true,
    'author': true,
    'gps_accuracy': true,
    'coordinate': true,
    'data': true,
  }
}