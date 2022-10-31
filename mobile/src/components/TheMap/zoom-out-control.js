L.ZoomOut = L.Control.extend({
    options: {
        position: 'topleft',
    },

    onAdd: function(map) {        
        const div = L.DomUtil.create('div', 'leaflet-control-interior');
        const p = L.DomUtil.create('p', 'material-symbols-sharp leaflet-control-input', div);

        p.innerHTML = 'zoom_out';

        L.DomEvent
            .addListener(div, 'click', L.DomEvent.stopPropagation)
            .addListener(div, 'click', L.DomEvent.preventDefault)
            .addListener(div, 'click', (e) => {
                map.zoomOut(map.options.zoomDelta * (e.shiftKey ? 3 : 1));
            });

        return div;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.zoomOut = function(opts) {
    return new L.ZoomOut(opts);
}

export var ZoomOut = L.ZoomOut;