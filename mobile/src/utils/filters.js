import { fullDateFormatter } from './formatter.js';

export default {
    poiFilter(poi, filterValue) {
      const filter = filterValue.toLowerCase();
      return poi.element.title?.toLowerCase().includes(filter)
      || poi.element.subtitle?.toLowerCase().includes(filter)
      || poi.element.User?.username?.toLowerCase().includes(filter)
      || poi.element.last_contributor_fk?.username?.toLowerCase().includes(filter)
      || fullDateFormatter(poi.element.creation_date).toLowerCase().includes(filter)
      || fullDateFormatter(poi.element.update_date).toLowerCase().includes(filter)
      || poi.element.radius.toString().toLowerCase().includes(filter)
      || poi.element.elevation.toString().toLowerCase().includes(filter)
      || poi.element.style_type?.toLowerCase().includes(filter)
      || poi.element.style_stroke_width.toString().toLowerCase().includes(filter)
      || poi.element.stroke_color.toLowerCase().includes(filter)
      || poi.element.stroke_opacity.toString().toLowerCase().includes(filter)
      || poi.element.scope.toString().toLowerCase().includes(filter)
      || poi.element.trigger_mode?.toLowerCase().includes(filter)
      || poi.element.amplitude.toString().toLowerCase().includes(filter)
      || poi.element.extrusion.toString().toLowerCase().includes(filter)
      || poi.element.metadata?.toString().toLowerCase().includes(filter)
      || poi.element.wireframe.toString().toLowerCase().includes(filter)
      || poi.element.fill_color.toString().toLowerCase().includes(filter)
      || poi.element.fill_opacity.toString().toLowerCase().includes(filter)
      || poi.element.id.toString().toLowerCase().includes(filter);
    },
  
    pathFilter(path, filterValue) {
      const filter = filterValue.toLowerCase();
      return path.element.User?.username?.toLowerCase().includes(filter)
      || path.element.last_contributor_fk?.username?.toLowerCase().includes(filter)
      || path.element.scope.toString().toLowerCase().includes(filter)
      || fullDateFormatter(path.element.creation_date).toLowerCase().includes(filter)
      || fullDateFormatter(path.element.update_date).toLowerCase().includes(filter)
      || path.element.style_stroke_width.toString().toLowerCase().includes(filter)
      || path.element.stroke_color.toLowerCase().includes(filter)
      || path.element.stroke_opacity.toString().toLowerCase().includes(filter)
      || path.element.extrusion.toString().toLowerCase().includes(filter)
      || path.element.elevation.toString().toLowerCase().includes(filter)
      || path.element.amplitude.toString().toLowerCase().includes(filter)
      || path.element.metadata?.toLowerCase().includes(filter)
      || path.element.id.toString().toLowerCase().includes(filter)
    },

    traceFilter(trace, filterValue) {
      const filter = filterValue.toLowerCase();
      return trace.element.User?.username?.toLowerCase().includes(filter)
      || fullDateFormatter(trace.element.creation_date).toLowerCase().includes(filter)
      || trace.element.id.toString().toLowerCase().includes(filter)
      || trace.element.gps_accuracy.toString().toLowerCase().includes(filter);
    },

    eventFilter(event, filterValue) {
      const filter = filterValue.toLowerCase();
      return event.element.User?.username?.toLowerCase().includes(filter)
      || fullDateFormatter(event.element.creation_date).toLowerCase().includes(filter)
      || event.element.id.toString().toLowerCase().includes(filter)
      || event.element.data.toString().toLowerCase().includes(filter)
      || event.element.gps_accuracy.toString().toLowerCase().includes(filter);
    },
  };
  