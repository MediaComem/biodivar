import { savePath as save, saveEvent } from './api.js';
import { store } from '../store/store.js';
import { mapStore } from '../../src/composables/map.js';
import { useStore } from '../../src/composables/store.js';

export async function savePath(coordinates, bioversId) {
  if (coordinates && coordinates.length > 0) {
    const defaultForm = {
      coordinate: coordinates,
      scope: 50,
      style_type: 'circle',
      elevation: 0,
      style_stroke_width: 1,
      stroke_color: '#FFFFFF',
      stroke_opacity: 40,
      amplitude: 0,
      biovers: bioversId,
      metadata: [],
    };
    const newPath = await save(defaultForm);
    store.dispatch('biovers/addNewPath', newPath.data);
    useStore().addPathInBiovers(newPath.data);

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
      data: 'create-path-' + newPath.data.id,
    });
  }
}
