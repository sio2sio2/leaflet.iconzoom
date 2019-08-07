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

.. _Leaflet: https://leafletjs.com
