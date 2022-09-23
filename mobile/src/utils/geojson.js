import { coordinateFormatter } from './formatter.js';

export function computeGeoJSONFromPOIs(pois) {
    if (pois && pois.length > 0) {
        let json = `
    {
        "name": "${pois[0].name}",
        "type": "FeatureCollection",
        "features": [`;
    pois.forEach((poi) => {
        if (poi.display) {
            json += `
            {
                "type": "Feature",
                "geometry": {
                "type": "Point",
                "coordinates": [${poi.element.coordinate.long}, ${poi.element.coordinate.lat}, ${poi.element.coordinate.alt}]
                },
                "properties": {
                "id_poi": "${poi.element.id}",
                "title": "${poi.element.title}",
                "title_is_visible": "${poi.element.title_is_visible}",
                "subtitle": "${poi.element.subtitle}",
                "subtitle_is_visible": "${poi.element.subtitle_is_visible}",
                "created_at": "${poi.element.creation_date}",
                "owner": "${poi.element.User ? poi.element.User.username : ''}",
                "updated_at": "${poi.element.update_date}",
                "contributor": "${poi.element.last_contributor_fk ? poi.element.last_contributor_fk.username : ''}",
                "scope": "${poi.element.scope}",
                "trigger": "${poi.element.trigger_mode}",
                "ar_symbol_visible": "${poi.element.symbol ? poi.element.symbol.is_visible_ar : ''}",
                "is_facing_user": "${poi.element.symbol ? poi.element.symbol.is_facing_user : ''}",
                "symbol_wireframe": "${poi.element.symbol ? poi.element.symbol.wireframe : ''}",
                "symbol_autoplay": "${poi.element.symbol ? poi.element.symbol.autoplay : ''}",
                "symbol_loop": "${poi.element.symbol ? poi.element.symbol.loop : ''}",
                "symbol_scale": "${poi.element.symbol ? poi.element.symbol.scale : ''}",
                "symbole_position": "${poi.element.symbol && poi.element.symbol.position ? `{ x: ${poi.element.symbol.position.x}, y: ${poi.element.symbol.position.y}, alpha: ${poi.element.symbol.position.alpha}}` : ''}",
                "symbol_altitude": "${poi.element.symbol? poi.element.symbol.amplitude : ''}",
                "audio_autoplay": "${poi.element.symbol ? poi.element.symbol.audio_autoplay : ''}",
                "audio_loop": "${poi.element.symbol ? poi.element.symbol.audio_loop : ''}",
                "audio_distance": "${poi.element.symbol ? poi.element.symbol.audio_distance : ''}",
                "symbol_visibility": "${poi.element.symbol ? poi.element.symbol.is_visible : ''}",
                "symbol_created_at": "${poi.element.symbol ? poi.element.symbol.creation_date : ''}",
                "symbol_updated_at": "${poi.element.symbol && poi.element.symbol.update_date ? poi.element.symbol.update_date : ''}",
                "style_type": "${poi.element.style_type}",
                "extrusion": "${poi.element.extrusion}",
                "radius": "${poi.element.radius}",
                "position": "${poi.element.position ? `{ x: ${poi.element.position.x}, y: ${poi.element.position.y}, alpha: ${poi.element.position.alpha}}` : ''}",
                "style_stoke": "${poi.element.style_stroke_width}",
                "stoke_color": "${poi.element.stroke_color}",
                "stroke_opacity": "${poi.element.stroke_opacity}",
                "wireframe": "${poi.element.wireframe}",
                "fill_color": "${poi.element.fill_color}",
                "file_opacity": "${poi.element.fill_opacity}",
                "amplitude": "${poi.element.amplitude}",
                "metadata": "${poi.element.metadata}"
                }
            },`
        }
    })
    json = json.slice(0, -1);
    json += `]
    }`;
return json;
    }
    return '';
}

export function computeGeoJSONFromPOI(poi) {
    return `
    {
        "name": "${poi.name}",
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [${poi.element.coordinate.long}, ${poi.element.coordinate.lat}, ${poi.element.coordinate.alt}]
            },
            "properties": {
              "id_poi": "${poi.element.id}",
              "title": "${poi.element.title}",
              "title_is_visible": "${poi.element.title_is_visible}",
              "subtitle": "${poi.element.subtitle}",
              "subtitle_is_visible": "${poi.element.subtitle_is_visible}",
              "created_at": "${poi.element.creation_date}",
              "owner": "${poi.element.User ? poi.element.User.username : ''}",
              "updated_at": "${poi.element.update_date}",
              "contributor": "${poi.element.last_contributor_fk ? poi.element.last_contributor_fk.username : ''}",
              "scope": "${poi.element.scope}",
              "trigger": "${poi.element.trigger_mode}",
              "ar_symbol_visible": "${poi.element.symbol ? poi.element.symbol.is_visible_ar : ''}",
              "is_facing_user": "${poi.element.symbol ? poi.element.symbol.is_facing_user : ''}",
              "symbol_wireframe": "${poi.element.symbol ? poi.element.symbol.wireframe : ''}",
              "symbol_autoplay": "${poi.element.symbol ? poi.element.symbol.autoplay : ''}",
              "symbol_loop": "${poi.element.symbol ? poi.element.symbol.loop : ''}",
              "symbol_scale": "${poi.element.symbol ? poi.element.symbol.scale : ''}",
              "symbole_position": "${poi.element.symbol && poi.element.symbol.position ? `{ x: ${poi.element.symbol.position.x}, y: ${poi.element.symbol.position.y}, alpha: ${poi.element.symbol.position.alpha}}` : ''}",
              "symbol_altitude": "${poi.element.symbol? poi.element.symbol.amplitude : ''}",
              "audio_autoplay": "${poi.element.symbol ? poi.element.symbol.audio_autoplay : ''}",
              "audio_loop": "${poi.element.symbol ? poi.element.symbol.audio_loop : ''}",
              "audio_distance": "${poi.element.symbol ? poi.element.symbol.audio_distance : ''}",
              "symbol_visibility": "${poi.element.symbol ? poi.element.symbol.is_visible : ''}",
              "symbol_created_at": "${poi.element.symbol ? poi.element.symbol.creation_date : ''}",
              "symbol_updated_at": "${poi.element.symbol && poi.element.symbol.update_date ? poi.element.symbol.update_date : ''}",
              "style_type": "${poi.element.style_type}",
              "extrusion": "${poi.element.extrusion}",
              "radius": "${poi.element.radius}",
              "position": "${poi.element.position ? `{ x: ${poi.element.position.x}, y: ${poi.element.position.y}, alpha: ${poi.element.position.alpha}}` : ''}",
              "style_stoke": "${poi.element.style_stroke_width}",
              "stoke_color": "${poi.element.stroke_color}",
              "stroke_opacity": "${poi.element.stroke_opacity}",
              "wireframe": "${poi.element.wireframe}",
              "fill_color": "${poi.element.fill_color}",
              "file_opacity": "${poi.element.fill_opacity}",
              "amplitude": "${poi.element.amplitude}",
              "metadata": "${poi.element.metadata}"
            }
          }
        ]
      }
    `;
}

export function computeGeoJSONFromPATHs(paths) {
  if (paths && paths.length > 0) {
      let json = `
  {
      "name": "${paths[0].name}",
      "type": "FeatureCollection",
      "features": [`;
      paths.forEach((path) => {
        if (path.display) {
          json += `
          {
            "type": "Feature",
            "geometry": {
              "type": "LineString",
              "coordinates": ${coordinateFormatter(path.element.coordinate)}
            },
            "properties": {
              "id_path": "${path.element.id}",
              "created_at": "${path.element.creation_date}",
              "owner": "${path.element.User ? path.element.User.username : ''}",
              "updated_at": "${path.element.update_date}",
              "contributor": "${path.element.last_contributor_fk ? path.element.last_contributor_fk.username : ''}",
              "scope": "${path.element.scope}",
              "style_type": "${path.element.style_type}",
              "style_stoke": "${path.element.style_stroke_width}",
              "amplitude": "${path.element.amplitude}",
              "elevation": "${path.element.style_elevation}"
            }
          },`
      }
  })
  json = json.slice(0, -1);
  json += `]
  }`;
return json;
  }
  return '';
}

export function computeGeoJSONFromPATH(path) { 
  return `
  {
    "name": "${path.name}",
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": ${coordinateFormatter(path.element.coordinate)}
        },
        "properties": {
          "id_path": "${path.element.id}",
          "created_at": "${path.element.creation_date}",
          "owner": "${path.element.User ? path.element.User.username : ''}",
          "updated_at": "${path.element.update_date}",
          "contributor": "${path.element.last_contributor_fk ? path.element.last_contributor_fk.username : ''}",
          "scope": "${path.element.scope}",
          "style_type": "${path.element.style_type}",
          "style_stoke": "${path.element.style_stroke_width}",
          "amplitude": "${path.element.amplitude}",
          "elevation": "${path.element.style_elevation}"
        }
      }
    ]
  }
`;
}

export function computeGeoJSONFromEvents(events) {
  if (events && events.length > 0) {
      let json = `
  {
      "name": "${events[0].name}",
      "type": "FeatureCollection",
      "features": [`;
      events.forEach((event) => {
        if (event.display) {
          json += `
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [${event.element.coordinate.long}, ${event.element.coordinate.lat}, ${event.element.coordinate.alt}]
            },
            "properties": {
              "id_event": "${event.element.id}",
              "created_at": "${event.element.creation_date}",
              "owner": "${event.element.User ? event.element.User.username : ''}",
              "gps_accuracy": "${event.element.gps_accuracy}",
              "event": "${event.element.data}"
            }
          },`
      }
  })
  json = json.slice(0, -1);
  json += `]
  }`;
return json;
  }
  return '';
}

export function computeGeoJSONFromEvent(event) { 
  return `
  {
    "name": "${event.name}",
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [${event.element.coordinate.long}, ${event.element.coordinate.lat}, ${event.element.coordinate.alt}]
        },
        "properties": {
          "id_event": "${event.element.id}",
          "created_at": "${event.element.creation_date}",
          "owner": "${event.element.User ? event.element.User.username : ''}",
          "gps_accuracy": "${event.element.gps_accuracy}",
          "event": "${event.element.data}"
        }
      }
    ]
  }
`;
}

export function computeGeoJSONFromTraces(traces) {
  if (traces && traces.length > 0) {
      let json = `
  {
      "name": "${traces[0].name}",
      "type": "FeatureCollection",
      "features": [`;
      traces.forEach((trace) => {
        if (trace.display) {
          json += `
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [${trace.element.coordinate.long}, ${trace.element.coordinate.lat}, ${trace.element.coordinate.alt}]
            },
            "properties": {
              "id_trace": "${trace.element.id}",
              "created_at": "${trace.element.creation_date}",
              "owner": "${trace.element.User ? trace.element.User.username : ''}",
              "gps_accuracy": "${trace.element.gps_accuracy}"
            }
          },`
      }
  })
  json = json.slice(0, -1);
  json += `]
  }`;
return json;
  }
  return '';
}

export function computeGeoJSONFromTrace(trace) { 
  return `
  {
    "name": "${trace.name}",
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [${trace.element.coordinate.long}, ${trace.element.coordinate.lat}, ${trace.element.coordinate.alt}]
        },
        "properties": {
          "id_event": "${trace.element.id}",
          "created_at": "${trace.element.creation_date}",
          "owner": "${trace.element.User ? trace.element.User.username : ''}",
          "gps_accuracy": "${trace.element.gps_accuracy}"
        }
      }
    ]
  }
`;
}