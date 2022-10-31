L.DownloadControl = L.Control.extend({
    options: {
        position: 'topleft',
    },

    onAdd: function(map) {        
        const div = L.DomUtil.create('div', 'leaflet-control-interior');
        const p = L.DomUtil.create('p', 'material-symbols-sharp leaflet-control-input', div);

        p.innerHTML = 'cloud_download';

        L.DomEvent
            .addListener(div, 'click', L.DomEvent.stopPropagation)
            .addListener(div, 'click', L.DomEvent.preventDefault)
            .addListener(div, 'click', (e) => {
                window.dispatchEvent(new CustomEvent('custom-download-control', {detail: map.getBounds()}));
            });

        return div;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.downloadControl = function(opts) {
    return new L.DownloadControl(opts);
}

export var DownloadControl = L.DownloadControl;