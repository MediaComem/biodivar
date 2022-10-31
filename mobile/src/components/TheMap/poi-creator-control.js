L.PoiCreator = L.Control.extend({
    options: {
        position: 'topleft',
    },

    onAdd: function(map) {
        let state = false;
        
        const div = L.DomUtil.create('div', 'leaflet-control-interior');
        const p = L.DomUtil.create('p', 'material-symbols-sharp leaflet-control-input', div);

        p.innerHTML = 'add_location';

        L.DomEvent
            .addListener(div, 'click', L.DomEvent.stopPropagation)
            .addListener(div, 'click', L.DomEvent.preventDefault)
            .addListener(div, 'click', () => {
                state = !state;
                state ? div.classList.add("leaflet-control-interior-select") : div.classList.remove("leaflet-control-interior-select");
                window.dispatchEvent(new CustomEvent('poi-creator-control', {detail: state}));
            });

        return div;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.poiCreator = function(opts) {
    return new L.PoiCreator(opts);
}

export var PoiCreator = L.PoiCreator;