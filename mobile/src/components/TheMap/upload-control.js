import { importPois } from '../../utils/api';

L.UploadControl = L.Control.extend({
  options: {
    position: 'topleft',
  },

  onAdd: function (map) {
    let poiControl = false;
    let pathControl = false;
    const div = L.DomUtil.create('div', 'leaflet-control-interior');
    const input = L.DomUtil.create('input', '');
    const p = L.DomUtil.create(
      'p',
      'material-symbols-sharp leaflet-control-input',
      div
    );

    p.innerHTML = 'cloud_upload';

    input.type = 'file';
    input.accept = '.json,.geojson,.zip';
    input.style.display = 'none';

    p.appendChild(input);

    L.DomEvent.addListener(div, 'click', () => {
        if (!pathControl && !poiControl) input.click();
    });

    L.DomEvent.addListener(input, 'change', (event) => {
      const reader = new FileReader();

      if (event.target.files[0].name.endsWith(".zip")) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]); 
        importPois(formData).then((success) => {
          window.dispatchEvent(
            new CustomEvent('custom-upload-control-from-zip', { detail: success.data })
          );
        }).catch((err) => {
          console.error(err);
        });
      } else {
        reader.onload = function (event) {
          const content = JSON.parse(event.target.result);
          window.dispatchEvent(
            new CustomEvent('custom-upload-control', { detail: content })
          );
        };
        reader.readAsText(event.target.files[0]);
      }
    });

    window.addEventListener('close-poi-editor', () => {
        poiControl = false;
        div.classList.remove('leaflet-control-interior-select');
    });

    window.addEventListener('poi-creator-control', (event) => {
        poiControl = event.detail;
        poiControl
          ? div.classList.add('leaflet-control-interior-select')
          : div.classList.remove('leaflet-control-interior-select');
      });

    window.addEventListener('close-path-editor', () => {
        pathControl = false;
        div.classList.remove('leaflet-control-interior-select');
    });

    window.addEventListener('path-creator-control', (event) => {
        pathControl = event.detail;
        pathControl
          ? div.classList.add('leaflet-control-interior-select')
          : div.classList.remove('leaflet-control-interior-select');
      });

    return div;
  },

  onRemove: function (map) {
    // Nothing to do here
  },
});

L.uploadControl = function (opts) {
  return new L.UploadControl(opts);
};

export var UploadControl = L.UploadControl;
