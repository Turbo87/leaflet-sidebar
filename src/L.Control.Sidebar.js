L.Control.Sidebar = L.Control.extend({
    options: {
    },

    initialize: function (placeholder, options) {
        L.setOptions(this, options);

        // Find content container
        var content = this._contentContainer = L.DomUtil.get(placeholder);

        // Remove the content container from its original parent
        content.parentNode.removeChild(content);

        // Make sure we don't drag the map when we interact with the content
        var stop = L.DomEvent.stopPropagation;
        L.DomEvent
            .on(content, 'click', stop)
            .on(content, 'mousedown', stop)
            .on(content, 'dblclick', stop)
            .on(content, 'click', L.DomEvent.preventDefault);

        // Search for close button and assign event handler
        if (content.getElementsByClassName) {
            var sidebar = this;
            var close = content.getElementsByClassName('close');
            for (var i = 0, len = close.length; i < len; i++) {
                L.DomEvent.on(close[i], 'click', function () {
                    sidebar.hide();
                });
            };
        }
    },

    addTo: function (map) {
        var l = 'leaflet-';

        // Create sidebar container
        var container = this._container =
            L.DomUtil.create('div', l + 'sidebar');

        // Style and attach content container
        var content = this._contentContainer;
        L.DomUtil.addClass(content, l + 'control');
        container.appendChild(content);

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

L.control.sidebar = function (placeholder, options) {
    return new L.Control.Sidebar(placeholder, options);
};
