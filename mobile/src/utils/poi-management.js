import { savePoi as save, saveEvent } from './api.js';
import { store } from '../store/store.js';

import { useStore } from '../../src/composables/store.js';
import { mapStore } from '../../src/composables/map.js';

export async function savePoi(coordinates, bioversId) {
  const defaultForm = {
    title: '',
    subtitle: '',
    biovers: bioversId,
    coordinate: {
      long: coordinates.lng,
      lat: coordinates.lat,
      alt: 0,
    },
    scope: 50,
    trigger_mode: 'location',
    style_type: 'circle',
    extrusion: 0,
    radius: 2,
    elevation: 0,
    style_stroke_width: 0.1,
    stroke_color: '#FFFFFF',
    stroke_opacity: 40,
    fill_type: false,
    fill_color: '#FFFFFF',
    fill_opacity: 20,
    amplitude: 0,
    wireframe: false,
    map_url: '',
    map_media_type: '',
    metadata: [],
    media: [],
  };
  const newPoi = await save(defaultForm);
  store.dispatch('biovers/addNewPoi', newPoi.data);
  useStore().addPoiInBiovers(newPoi.data);

  const { accuracy, position } = mapStore();
  await saveEvent({
    is_public: true,
    gps_accuracy: accuracy.value,
    biovers: bioversId,
    coordinate: {
      lat: position.value[0],
      long: position.value[1],
      alt: position.value[2] ?? 0,
    },
    data: 'create-poi-' + newPoi.data.id,
  });
}
