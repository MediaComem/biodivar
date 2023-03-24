L.PathCreator = L.Control.extend({
    options: {
        position: 'topleft',
    },

    onAdd: function(map) {
        let state = false;

        window.addEventListener('close-path-editor', () => {
            state = false;
            state ? div.classList.add("leaflet-control-interior-select") : div.classList.remove("leaflet-control-interior-select");
            window.dispatchEvent(new CustomEvent('path-creator-control', {detail: state}));
        });
        
        const div = L.DomUtil.create('div', 'leaflet-control-interior');
        const p = L.DomUtil.create('p', 'material-symbols-sharp leaflet-control-input', div);

        p.innerHTML = 'timeline';

        L.DomEvent
            .addListener(div, 'click', L.DomEvent.stopPropagation)
            .addListener(div, 'click', L.DomEvent.preventDefault)
            .addListener(div, 'click', () => {
                state = !state;
                state ? div.classList.add("leaflet-control-interior-select") : div.classList.remove("leaflet-control-interior-select");
                window.dispatchEvent(new CustomEvent('path-creator-control', {detail: state}));
            });

        return div;
    },

    onRemove: function(map) {
        window.removeEventListener('close-path-editor', () => {});
        // Nothing to do here
    }
});

L.pathCreator = function(opts) {
    return new L.PathCreator(opts);
}

export var PathCreator = L.PathCreator;