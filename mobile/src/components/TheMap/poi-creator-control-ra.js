L.PoiCreatorRa = L.Control.extend({
    options: {
        position: 'bottomright',
    },

    onAdd: function(map) {
        let state = false;

        window.addEventListener('close-poi-editor-ra', () => {
            state = false;
            state ? div.classList.add("leaflet-control-interior-select") : div.classList.remove("leaflet-control-interior-select");
        });
        
        const div = L.DomUtil.create('div', 'leaflet-control-interior-poi-ra');
        const p = L.DomUtil.create('p', 'material-symbols-sharp leaflet-control-input-white', div);

        p.innerHTML = 'add_location';

        L.DomEvent
            .addListener(div, 'click', L.DomEvent.stopPropagation)
            .addListener(div, 'click', L.DomEvent.preventDefault)
            .addListener(div, 'click', () => {
                state = !state;
                state ? div.classList.add("leaflet-control-interior-select") : div.classList.remove("leaflet-control-interior-select");
                window.dispatchEvent(new CustomEvent('poi-creator-control-ra', {detail: state}));
            });

        return div;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.poiCreatorRa = function(opts) {
    return new L.PoiCreatorRa(opts);
}

export var PoiCreatorRa = L.PoiCreatorRa;