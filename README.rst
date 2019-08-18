Leaflet.iconzoom
================

*Plugin* para Leaflet_ que añade el efecto de agrandar los iconos al pasar el
ratón sobre ellos. Para lograrlo, basta con añadir a `L.Icon
<https://leafletjs.com/reference-1.5.0.html#icon>`_ la propiedad *factor*:

.. code-block:: js

   var Icon = L.Icon.extend({
      options: {
         factor:       1.25,
         iconSize:     [25, 25],
         iconAnchor:   [12.5, 25],
      }
   });

Puede consultar:

* `Ejemplo de uso que también requiere cargar Leaflet
  <https://sio2sio2.github.io/leaflet.iconzoom/examples>`_.
* `Ejemplo de uso que usa el sabor bundle y no requiere dependencias (Leaflet)
  <https://sio2sio2.github.io/leaflet.iconzoom/examples/index.bundle.html>`_
* `Ejemplo que usa la versión de depuración
  <https://sio2sio2.github.io/leaflet.iconzoom/examples/index.debug.html>`_.

.. _Leaflet: https://leafletjs.com
