const Icon = L.DivIcon.extend({
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

   // Plantilla para construir el icono.
   const template = document.querySelector("template").content.firstElementChild;

   // Objeto geojson para la marca
   const data = {
      type: "Feature",
      properties: {
         name: "Doña marca",
         message: "Soy la increíble marca cambiante"
      },
      geometry: {
         type: "Point",
         coordinates: [-6.27, 37.07]
      }
   }

   const layer = L.geoJSON(data, {
      pointToLayer: (f, p) => new L.Marker(p, { icon: new Icon({ html: template.cloneNode(true) }) }),
      onEachFeature: (f, l) => {
         l.on("click", e => alert(f.properties.message));
      }
   }).addTo(map);

   //Marca con el icono predeterminado para comprobar webpack-defaulticon-compatibility
   L.marker([37.5, -6], {
      title: "No me encojo: soy normal"
   }).addTo(map);

   // Marca de agua (nada que ver con lo que se prueba.
   const Watermark = L.Control.extend({
      onAdd: function(map) {
         const img = L.DomUtil.create("img");
         img.src = "logo.svg"
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
