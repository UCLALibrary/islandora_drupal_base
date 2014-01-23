

window.google = window.google || {};
google.maps = google.maps || {};
(function() {
  
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"' +
                   ' type="text/javascript"><' + '/script>');
  }
  
  var modules = google.maps.modules = {};
  google.maps.__gjsload__ = function(name, text) {
    modules[name] = text;
  };
  
  google.maps.Load = function(apiLoad) {
    delete google.maps.Load;
    apiLoad([0.009999999776482582,[[["http://mt0.googleapis.com/vt?lyrs=m@245000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=m@245000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"m@245000000",["https://mts0.google.com/vt?lyrs=m@245000000\u0026src=api\u0026hl=en-US\u0026","https://mts1.google.com/vt?lyrs=m@245000000\u0026src=api\u0026hl=en-US\u0026"]],[["http://khm0.googleapis.com/kh?v=142\u0026hl=en-US\u0026","http://khm1.googleapis.com/kh?v=142\u0026hl=en-US\u0026"],null,null,null,1,"142",["https://khms0.google.com/kh?v=142\u0026hl=en-US\u0026","https://khms1.google.com/kh?v=142\u0026hl=en-US\u0026"]],[["http://mt0.googleapis.com/vt?lyrs=h@245000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=h@245000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"h@245000000",["https://mts0.google.com/vt?lyrs=h@245000000\u0026src=api\u0026hl=en-US\u0026","https://mts1.google.com/vt?lyrs=h@245000000\u0026src=api\u0026hl=en-US\u0026"]],[["http://mt0.googleapis.com/vt?lyrs=t@131,r@245000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=t@131,r@245000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"t@131,r@245000000",["https://mts0.google.com/vt?lyrs=t@131,r@245000000\u0026src=api\u0026hl=en-US\u0026","https://mts1.google.com/vt?lyrs=t@131,r@245000000\u0026src=api\u0026hl=en-US\u0026"]],null,null,[["http://cbk0.googleapis.com/cbk?","http://cbk1.googleapis.com/cbk?"]],[["http://khm0.googleapis.com/kh?v=82\u0026hl=en-US\u0026","http://khm1.googleapis.com/kh?v=82\u0026hl=en-US\u0026"],null,null,null,null,"82",["https://khms0.google.com/kh?v=82\u0026hl=en-US\u0026","https://khms1.google.com/kh?v=82\u0026hl=en-US\u0026"]],[["http://mt0.googleapis.com/mapslt?hl=en-US\u0026","http://mt1.googleapis.com/mapslt?hl=en-US\u0026"]],[["http://mt0.googleapis.com/mapslt/ft?hl=en-US\u0026","http://mt1.googleapis.com/mapslt/ft?hl=en-US\u0026"]],[["http://mt0.googleapis.com/vt?hl=en-US\u0026","http://mt1.googleapis.com/vt?hl=en-US\u0026"]],[["http://mt0.googleapis.com/mapslt/loom?hl=en-US\u0026","http://mt1.googleapis.com/mapslt/loom?hl=en-US\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=en-US\u0026","https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026","https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]]],["en-US","US",null,0,null,null,"http://maps.gstatic.com/mapfiles/","http://csi.gstatic.com","https://maps.googleapis.com","http://maps.googleapis.com"],["http://maps.gstatic.com/intl/en_us/mapfiles/api-3/15/1a","3.15.1a"],[3326569512],1,null,null,null,null,1,"",null,null,0,"http://khm.googleapis.com/mz?v=142\u0026",null,"https://earthbuilder.googleapis.com","https://earthbuilder.googleapis.com",null,"http://mt.googleapis.com/vt/icon",[["http://mt0.googleapis.com/vt","http://mt1.googleapis.com/vt"],["https://mts0.googleapis.com/vt","https://mts1.googleapis.com/vt"],[null,[[0,"m",245000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[47],[37,[["smartmaps"]]]]],0],[null,[[0,"m",245000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[47],[37,[["smartmaps"]]]]],3],[null,[[0,"h",245000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[50],[37,[["smartmaps"]]]]],0],[null,[[0,"h",245000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[50],[37,[["smartmaps"]]]]],3],[null,[[4,"t",131],[0,"r",131000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[5],[37,[["smartmaps"]]]]],0],[null,[[4,"t",131],[0,"r",131000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[5],[37,[["smartmaps"]]]]],3],[null,null,[null,"en-US","US",null,18],0],[null,null,[null,"en-US","US",null,18],3],[null,null,[null,"en-US","US",null,18],6],[null,null,[null,"en-US","US",null,18],0],["https://mts0.google.com/vt","https://mts1.google.com/vt"]],2,500], loadScriptTime);
  };
  var loadScriptTime = (new Date).getTime();
  getScript("http://maps.gstatic.com/intl/en_us/mapfiles/api-3/15/1a/main.js");
})();
;
(function ($) {
  Drupal.behaviors.deviceGeolocationCheck = {
    attach: function (context, settings) {
      $.ajax({
        url:  settings.basePath + 'check-geolocation-attempt',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
          if (data.ask_geolocate) {
            settings.device_geolocation.ask_geolocate = true;
            Drupal.behaviors.deviceGeolocationAutoDetect.attach(context, settings);
          }
        }
      });
    }
  };  
})(jQuery);;
(function ($) {
  Drupal.behaviors.deviceGeolocationAutoDetect = {
    attach: function (context, settings) {
      var geolocation_source = 1; // Default it to Maxmind
      if (!settings.device_geolocation.ask_geolocate) {
        // Don't ask user for geolocation. Duration of frequency checking is set.
        return;
      }
      settings.device_geolocation.ask_geolocate = false;
      if (isset(settings.device_geolocation.longitude)) {
        longitude = !isNaN(settings.device_geolocation.longitude) ? settings.device_geolocation.longitude : (!isNaN(settings.device_geolocation.longitude[0]) ? settings.device_geolocation.longitude[0] : null);
      }
      else {
        longitude = null;
      }
      if (isset(settings.device_geolocation.latitude)) {
        latitude = !isNaN(settings.device_geolocation.latitude) ? settings.device_geolocation.latitude : (!isNaN(settings.device_geolocation.latitude[0]) ? settings.device_geolocation.latitude[0] : null);
      }
      else {
        latitude = null;
      }
      // Try W3C Geolocation (Preferred) to detect user's location
      if (navigator.geolocation && !settings.device_geolocation.debug_mode) {
        navigator.geolocation.getCurrentPosition(function(position) {
          geolocation_source = 2; // W3C
          geocoder_send_address(position.coords.latitude, position.coords.longitude);
        }, function() {
          // Smart IP (Maxmind) fallback
          geocoder_send_address(latitude, longitude);
        });
      }
      // Smart IP (Maxmind) fallback or using debug mode coordinates
      else {
        geocoder_send_address(latitude, longitude);
      }
      /**
       * Possible array items:
       * -street_number;
       * -postal_code;
       * -route;
       * -neighborhood;
       * -locality;
       * -sublocality;
       * -establishment;
       * -administrative_area_level_N;
       * -country;
       */
      function geocoder_send_address(latitude, longitude) {
        if (latitude != null && longitude != null && !isNaN(latitude) && !isNaN(longitude)) {
          var geocoder = new google.maps.Geocoder();
          var latlng   = new google.maps.LatLng(latitude, longitude);
          var address  = new Object;
          geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                for (var i = 0; i < results[0].address_components.length; ++i) {
                  var long_name  = results[0].address_components[i].long_name || '';
                  var short_name = results[0].address_components[i].short_name || '';
                  var type = results[0].address_components[i].types[0];
                  if (long_name != null) {
                    // Manipulate the result to our liking
                    switch(type) {
                      case 'country':
                        address['country'] = long_name;
                        if (short_name != null) {
                          address['country_code'] = short_name;
                        }
                        break;
                      default:
                        address[type] = long_name;
                    }
                  }
                }
                address['source']    = geolocation_source;
                address['latitude']  = latitude;
                address['longitude'] = longitude;
                $.ajax({
                  url:  Drupal.settings.basePath + 'geolocate-user',
                  type: 'POST',
                  dataType: 'json',
                  data: address
                });
              }
            }
            else {
              $.ajax({
                url:  Drupal.settings.basePath + 'geolocate-user',
                type: 'POST',
                dataType: 'json',
                data: ({
                  latitude:  latitude,
                  longitude: latitude
                })
              });
              console.log('Geocoder failed due to: ' + status);
            }
          });
        }
      }
    }
  };  
})(jQuery);

function isset() {  
  var a = arguments
  var l = a.length, i = 0;
  
  if (l === 0) {
    throw new Error('Empty'); 
  }
  while (i !== l) {
    if (typeof(a[i]) == 'undefined' || a[i] === null) { 
        return false; 
    }
    else { 
      i++; 
    }
  }
  return true;
};
