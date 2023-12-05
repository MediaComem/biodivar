import { coordinateFormatter } from './formatter.js';

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
              "style_stoke": "${path.element.style_stroke_width}",
              "stroke_color": "${path.element.stroke_color}",
              "stroke_opacity": "${path.element.stroke_opacity}",
              "amplitude": "${path.element.amplitude}",
              "extrusion": "${path.element.extrusion}",
              "elevation": "${path.element.style_elevation}"
              "metadata": "${path.element.metadata}",
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
            "style_stoke": "${path.element.style_stroke_width}",
            "stroke_color": "${path.element.stroke_color}",
            "stroke_opacity": "${path.element.stroke_opacity}",
            "amplitude": "${path.element.amplitude}",
            "extrusion": "${path.element.extrusion}",
            "elevation": "${path.element.style_elevation}"
            "metadata": "${path.element.metadata}",
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