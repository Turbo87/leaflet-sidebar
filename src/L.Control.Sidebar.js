L.Control.Sidebar = L.Control.extend({
    options: {
    },

    addTo: function (map) {
        var l = 'leaflet-';

        // Create sidebar container
        var container = this._container =
            L.DomUtil.create('div', l + 'sidebar');

        // Create content container
        var contentContainer = this._contentContainer =
            L.DomUtil.create('div', l + 'sidebar-content ' + l + 'control', container);

        var stop = L.DomEvent.stopPropagation;
        L.DomEvent
            .on(contentContainer, 'click', stop)
            .on(contentContainer, 'mousedown', stop)
            .on(contentContainer, 'dblclick', stop)
            .on(contentContainer, 'click', L.DomEvent.preventDefault);

        // Attach sidebar container to controls container
        var controlContainer = map._controlContainer;
        controlContainer.insertBefore(container, controlContainer.firstChild);

        return this;
    },

    removeFrom: function (map) {
        // Remove sidebar container from controls container
        var controlContainer = map._controlContainer;
        controlContainer.removeChild(this._container);

        return this;
    },

    show: function () {
        L.DomUtil.addClass(this._container, 'leaflet-sidebar-visible')
    },

    hide: function () {
        L.DomUtil.removeClass(this._container, 'leaflet-sidebar-visible')
    }
});

L.control.sidebar = function (options) {
    return new L.Control.Sidebar(options);
};
