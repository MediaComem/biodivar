L.DownloadControl = L.Control.extend({
  options: {
    position: 'topleft',
  },

  onAdd: function (map) {
    let poiControl = false;
    let pathControl = false;
    const div = L.DomUtil.create('div', 'leaflet-control-interior');
    const p = L.DomUtil.create(
      'p',
      'material-symbols-sharp leaflet-control-input',
      div
    );

    p.innerHTML = 'cloud_download';

    L.DomEvent.addListener(div, 'click', L.DomEvent.stopPropagation)
      .addListener(div, 'click', L.DomEvent.preventDefault)
      .addListener(div, 'click', (e) => {
        if (!pathControl && !poiControl) window.dispatchEvent(
          new CustomEvent('custom-download-control', {
            detail: map.getBounds(),
          })
        );
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

L.downloadControl = function (opts) {
  return new L.DownloadControl(opts);
};

export var DownloadControl = L.DownloadControl;
