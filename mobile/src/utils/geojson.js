export function computeGeoJSONFromPOIs(pois) {
    if (pois && pois.length > 0) {
        let json = `
    {
        "name": "${pois[0].name}",
        "type": "FeatureCollection",
        "features": [`;
    pois.forEach((poi) => {
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