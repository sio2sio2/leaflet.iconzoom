if(process.env.output === "bundle") {
   require("leaflet-defaulticon-compatibility");
   require("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css");
}

L.Icon.prototype.zoom = function(factor) {
   factor = factor || this.options.factor;
   if(!factor) return;
   this.options.iconSize = this.options.iconSize.map(e => e*factor);
   this.options.iconAnchor = this.options.iconAnchor.map(e => e*factor);
}

L.Marker.addInitHook(function() {
   this.on("mouseover mouseout", function(e) { 
      const icon = e.target.options.icon;
      if(!icon.options.factor) return;
      if(e.type === "mouseover") icon.zoom();
      else {
         delete icon.options.iconSize;
         delete icon.options.iconAnchor;
      }
      this.setIcon(icon);
   });
});

export default L.Icon
