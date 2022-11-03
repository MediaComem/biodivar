L.CloseMap = L.Control.extend({
    options: {
        position: 'topright',
    },

    onAdd: function(map) {        
        const div = L.DomUtil.create('div', 'leaflet-control-interior-cross');
        const p = L.DomUtil.create('p', 'material-symbols-sharp leaflet-control-input', div);

        p.innerHTML = 'close';

        L.DomEvent
            .addListener(div, 'click', L.DomEvent.stopPropagation)
            .addListener(div, 'click', L.DomEvent.preventDefault)
            .addListener(div, 'click', () => {
                window.dispatchEvent(new CustomEvent('close-ar-map', {}));
            });

        return div;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.closeMap = function(opts) {
    return new L.CloseMap(opts);
}

export var CloseMap = L.CloseMap;