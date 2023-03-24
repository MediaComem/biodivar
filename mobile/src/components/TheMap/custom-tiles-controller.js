const KEY = import.meta.env.VITE_APP_MAP_KEY;

L.CustomTilesController = L.Control.extend({
    options: {
        position: 'topright',
    },

    onAdd: function(map) {
        let openMenu = false;

        const dark = {
            name: 'Dark',
            url: `https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=${KEY}`,
            attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e \u003ca href=\"https://www.swisstopo.admin.ch/en/home.html\" target=\"_blank\"\u003e\u0026copy; swisstopo\u003c/a\u003e"
        }

        const base = {
            name: 'Base',
            url: `https://api.maptiler.com/maps/50a99959-5522-4b4a-8489-28de9d3af0ed/{z}/{x}/{y}.png?key=${KEY}`,
            attribution: ""
        }

        const div = L.DomUtil.create('div', 'leaflet-control-interior leaflet-control-right');
        const p = L.DomUtil.create('p', 'material-symbols-sharp leaflet-control-input-right', div);

        p.innerHTML = 'layers';


        const content = L.DomUtil.create('div', 'leaflet-popup-radio-layout', div);

        const radio = L.DomUtil.create('div', 'leaflet-radio-div' , content);
        const darkRadio = L.DomUtil.create('input', 'leaflet-radio-input', radio);
        darkRadio.type = "radio";
        darkRadio.name = 'tile';
        darkRadio.id = dark.name;
        darkRadio.checked = true;
        const darkLabel = L.DomUtil.create('label', 'leaflet-radio-label', radio);
        darkLabel.setAttribute("for", dark.name);
        darkLabel.innerHTML = dark.name;

        const radio2 = L.DomUtil.create('div', 'leaflet-radio-div', content);
        const baseRadio = L.DomUtil.create('input', 'leaflet-radio-input', radio2);
        baseRadio.type = "radio";
        baseRadio.name = 'tile';
        baseRadio.id = base.name;
        baseRadio.checked = false;
        const baseLabel = L.DomUtil.create('label', 'leaflet-radio-label', radio2);
        baseLabel.setAttribute("for", base.name);
        baseLabel.innerHTML = base.name;

        content.style.display = 'none';

        L.DomEvent.addListener(baseRadio, 'click', () => {
            window.dispatchEvent(new CustomEvent('custom-tiles-control', {detail: base}));
        })

        L.DomEvent.addListener(darkRadio, 'click', () => {
            window.dispatchEvent(new CustomEvent('custom-tiles-control', {detail: dark}));
        })

        L.DomEvent
            .addListener(p, 'click', () => {
                openMenu = !openMenu;
                content.style.display = openMenu ? 'block' : 'none';
            });

        return div;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.customTilesController = function(opts) {
    return new L.CustomTilesController(opts);
}

export var CustomTilesController = L.CustomTilesController;