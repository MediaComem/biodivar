import { fullDateFormatter } from './formatter.js';

export default {
    poiFilter(poi, filterValue) {
      return poi.element.title?.includes(filterValue)
      || poi.element.subtitle?.includes(filterValue)
      || poi.element.User?.username?.includes(filterValue)
      || poi.element.last_contributor_fk?.username?.includes(filterValue)
      || fullDateFormatter(poi.element.creation_date).includes(filterValue)
      || fullDateFormatter(poi.element.update_date).includes(filterValue)
      || poi.element.radius.toString().includes(filterValue)
      || poi.element.elevation.toString().includes(filterValue)
      || poi.element.style_type?.includes(filterValue)
      || poi.element.style_stroke_width.toString().includes(filterValue)
      || poi.element.stroke_color.includes(filterValue)
      || poi.element.stroke_opacity.toString().includes(filterValue)
      || poi.element.scope.toString().includes(filterValue)
      || poi.element.trigger_mode?.includes(filterValue)
      || poi.element.amplitude.toString().includes(filterValue)
      || poi.element.extrusion.toString().includes(filterValue)
      || poi.element.metadata?.toString().includes(filterValue)
      || poi.element.wireframe.toString().includes(filterValue)
      || poi.element.fill_color.toString().includes(filterValue)
      || poi.element.fill_opacity.toString().includes(filterValue)
      || poi.element.id.toString().includes(filterValue);
    },
  
    pathFilter(path, filterValue) {
      return path.element.User?.username?.includes(filterValue)
      || path.element.last_contributor_fk?.username?.includes(filterValue)
      || path.element.scope.toString().includes(filterValue)
      || fullDateFormatter(path.element.creation_date).includes(filterValue)
      || fullDateFormatter(path.element.update_date).includes(filterValue)
      || path.element.style_stroke_width.toString().includes(filterValue)
      || path.element.stroke_color.includes(filterValue)
      || path.element.stroke_opacity.toString().includes(filterValue)
      || path.element.extrusion.toString().includes(filterValue)
      || path.element.elevation.toString().includes(filterValue)
      || path.element.amplitude.toString().includes(filterValue)
      || path.element.metadata?.includes(filterValue)
      || path.element.id.toString().includes(filterValue)
    },

    traceFilter(trace, filterValue) {
      return trace.element.User?.username?.includes(filterValue)
      || fullDateFormatter(trace.element.creation_date).includes(filterValue)
      || trace.element.id.toString().includes(filterValue)
      || trace.element.gps_accuracy.toString().includes(filterValue);
    },

    eventFilter(event, filterValue) {
      return event.element.User?.username?.includes(filterValue)
      || fullDateFormatter(event.element.creation_date).includes(filterValue)
      || event.element.id.toString().includes(filterValue)
      || event.element.data.toString().includes(filterValue)
      || event.element.gps_accuracy.toString().includes(filterValue);
    },
  };
  