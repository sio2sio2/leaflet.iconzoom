function encodeSVG(svg) {
  var type = "image/svg+xml";

   return "data:" + type + "," +
      svg.outerHTML.replace(/(:?<|>|"|'|#|\s+)/g, function(c) {
         return {
            '<': '%3C',
            '>': '%3E',
            '"': "%22",
            "'": "%27",
            '#': '%23'
         }[c] || " ";
     });
}

const Icon = L.Icon.extend({
   options: {
      factor:       1.25, // Provoca que se haga zoom al pasar sobre el icono
      iconSize:     [25, 25],
      iconAnchor:   [12.5, 25],
   }
})

window.onload = function() {
   const map = L.map('map').setView([37.07, -6.27], 9);
   map.zoomControl.setPosition('bottomright');
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
     maxZoom: 18
   }).addTo(map);

   const svg = document.querySelector("template").content.firstElementChild;

   // Objeto geojson
   const data = {
      type: "Feature",
      properties: {
         name: "Una marca",
         popupContent: "Soy una marca"
      },
      geometry: {
         type: "Point",
         coordinates: [-6.27, 37.07]
      }
   }

   function onEachFeature(f, l) {
      l.on("click", function(e) {
         console.log(l === e.target);  // La marca.
         console.log(f === e.target.feature); // El objeto geojson.
         console.log(layer === e.target.feature.properties.layer);  // La capa que contiene los objetos.
         alert(e.target.feature.properties.name);
      });
   }

   function pointToLayer(f, p) {
      if(!f.properties.marker) {
         f.properties.marker = new L.Marker(p, {icon: new Icon({iconUrl: encodeSVG(svg)})});
      }
      return f.properties.marker;
   }

   const SVGLayer = L.GeoJSON.extend({
      addData: function(geojson) {
         if(!Array.isArray(geojson) && !geojson.features) geojson.properties.layer = this;
         return L.GeoJSON.prototype.addData.call(this, geojson);
      }
   });

   const layer = new SVGLayer(data, {
      onEachFeature: onEachFeature,
      pointToLayer: pointToLayer
   }).addTo(map);

   const Watermark = L.Control.extend({
      onAdd: function(map) {
         const img = L.DomUtil.create("img");
         img.src = "images/logo.svg"
         img.style.width = "200px";

         return img
      },
      onRemove: function(map) {}
   });

   L.control.watermark = function(opts) {
      return new Watermark(opts);
   }

   L.control.watermark({position: "bottomleft"}).addTo(map);
}
