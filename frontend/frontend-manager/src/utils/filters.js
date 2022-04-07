export default {
  poiFilter(poi, filterValue) {
    return poi.element.title?.includes(filterValue)
    || poi.element.subtitle?.includes(filterValue)
    || poi.element.User?.username?.includes(filterValue)
    || poi.element.last_contributor_fk?.username?.includes(filterValue)
    || poi.element.radius === +filterValue
    || poi.element.style_type?.includes(filterValue)
    || poi.element.style_stroke_width === +filterValue
    || poi.element.style_elevation === +filterValue
    || poi.element.style_elevation_ground === +filterValue
    || poi.element.style_noise === +filterValue
    || poi.element.visible_from === +filterValue
    || poi.element.trigger_mode?.includes(filterValue)
    || poi.element.metadata?.includes(filterValue);
  },

  pathFilter(path, filterValue) {
    return path.element.User?.username?.includes(filterValue)
    || path.element.last_contributor_fk?.username?.includes(filterValue)
    || path.element.style_type?.includes(filterValue)
    || path.element.style_stroke_width === +filterValue
    || path.element.style_elevation === +filterValue
    || path.element.style_elevation_ground === +filterValue
    || path.element.style_noise === +filterValue
    || path.element.visible_from === +filterValue
    || path.element.trigger_mode?.includes(filterValue)
    || path.element.metadata?.includes(filterValue);
  },
};
