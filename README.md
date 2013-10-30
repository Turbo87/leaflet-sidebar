# leaflet-sidebar

A responsive sidebar plugin for for [Leaflet](http://leafletjs.com/), a JS library for interactive maps.

*leaflet-sidebar was developed to work with Leaflet 0.6.4. I don't know whether it works with older versions.*


## Using the plugin

See the included examples for usage.


### Usage

Add a content container somewhere in your document:

~~~~html
<div id="sidebar">
    <h1>leaflet-sidebar</h1>
</div>
~~~~

Create a new `L.Control.Sidebar` and add it to the map:

~~~~javascript
var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});

map.addControl(sidebar);
~~~~

The sidebar will be hidden on startup, use the following methods to show or hide it:

~~~~javascript
// Show sidebar
sidebar.show();

// Hide sidebar
sidebar.hide();

// Toggle sidebar visibility
sidebar.toggle();
~~~~

If you want the sidebar to be visible on startup use the following snippet after adding it to the map:

~~~~javascript
setTimeout(function () {
    sidebar.show();
}, 500);
~~~~

Do not call `show()` directly after adding the control to the map. The `setTimeout` will work around some CSS quirks for you.

The content of the sidebar can be changed dynamically:

~~~~javascript
sidebar.setContent('test <b>test</b> test');
~~~~

If you need more flexibility you can use `sidebar.getContainer()` to get the content container element or use e.g. jQuery on the `<div id="sidebar">` element.

### Options

The sidebar can be configured with these options:

- **position**: Can be `left` (default) or `right` and shouldn't need explaining.
- **closeButton*: Can be `true` (default) or `false`. If `true` a close button will be added to the sidebar.

## License

leaflet-sidebar is free software, and may be redistributed under the MIT LICENSE.
