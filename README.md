# leaflet-sidebar

A responsive sidebar plugin for [Leaflet](http://leafletjs.com/), a JS library for interactive maps.

Please also have a look at [sidebar-v2](https://github.com/Turbo87/sidebar-v2), the tabbed successor of this library.

<a href="https://flattr.com/submit/auto?user_id=turbo&url=https%3A%2F%2Fgithub.com%2FTurbo87%2Fleaflet-sidebar" target="_blank"><img src="https://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0"></a>


## Examples

![Basic example](leaflet-sidebar.gif)

Examples are available in the `examples` folder and on Github Pages:

* [Basic example](http://turbo87.github.io/leaflet-sidebar/examples/)
* [mapbox.js listing-markers example](http://turbo87.github.io/leaflet-sidebar/examples/listing-markers.html)
* [Example with 2 sidebars](http://turbo87.github.io/leaflet-sidebar/examples/two-sidebars.html)


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

// Check sidebar visibility
var visible = sidebar.isVisible();
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
- **closeButton**: Can be `true` (default) or `false`. If `true` a close button will be added to the sidebar.
- **autoPan**: Can be `true` (default) or `false`. If `true` the map will be shifted when the sidebar is shown.


### Events

Whenever the visibility of the sidebar is changed, an event is fired on the sidebar instance. You can listen for these events like this:

~~~~javascript
sidebar.on('hidden', function () {
    console.log('Sidebar is now hidden.');
});
~~~~

Available events:

- **show**: Show animation is starting, sidebar will be visible.
- **shown**: Show animation finished, sidebar is now visible.
- **hide**: Hide animation is starting, sidebar will be hidden.
- **hidden**: Hide animation finished, sidebar is now hidden.

Note that the `shown` and `hidden` events depend on `transitionend`/`webkitTransitionEnd` which might not be supported by all browsers yet.


## Compatibility

leaflet-sidebar was developed to work with Leaflet 0.6.4 and should work fine
with v0.7 too. I have no information whether it works well with older versions.

The leaflet-sidebar plugin has been tested on the following systems and browsers:

- Ubuntu: Firefox, Chrome
- Mac OS X: Firefox, Chrome, Safari
- Android 4.3: Firefox, Chrome, Opera
- iOS: Safari
- Windows XP: Internet Explorer 6 (failed!)


## License

leaflet-sidebar is free software, and may be redistributed under the [MIT license](LICENSE).
