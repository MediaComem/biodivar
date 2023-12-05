import { PoiModels } from "../types/poi-model";

export function computeGeoJSONFromPOIs(pois: PoiModels) {
    if (pois && pois.length > 0) {
        let json = `
    {
        "name": "${pois[0].title}",
        "type": "FeatureCollection",
        "features": [`;
            pois.forEach((poi) => {
            json += `
            {
                "type": "Feature",
                "geometry": {
                "type": "Point",
                "coordinates": [${poi.coordinate?.long}, ${poi.coordinate?.lat}, ${poi.coordinate?.alt}]
                },
                "properties": {
                "id_poi": "${poi.id}",
                "biovers": ${poi.biovers},
                "title": "${poi.title}",
                "subtitle": "${poi.subtitle}",
                "created_at": "${poi.creation_date}",
                "owner": "${poi.user?.username}",
                "updated_at": "${poi.update_date}",
                "contributor": "${poi.last_contributor_fk?.username}",
                "scope": "${poi.scope}",
                "trigger": "${poi.trigger_mode}",
                "style_type": "${poi.style_type}",
                "extrusion": "${poi.extrusion}",
                "radius": "${poi.radius}",
                "style_stoke": "${poi.style_stroke_width}",
                "stoke_color": "${poi.stroke_color}",
                "stroke_opacity": "${poi.stroke_opacity}",
                "wireframe": ${poi.wireframe},
                "fill_color": "${poi.fill_color}",
                "file_opacity": "${poi.fill_opacity}",
                "amplitude": "${poi.amplitude}",
                "metadata": ${poi.metadata},
                "media": ${JSON.stringify(poi.media)},
                "map_url": "${poi.map_url}"
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