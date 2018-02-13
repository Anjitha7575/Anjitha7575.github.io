var app = angular.module('foodApp',['ui.router']);
app.controller('appController',['$scope','$state',function($scope, $state){
            // var zomato = require('zomato');
            // var client = zomato.createClient({
            //   userKey: 'API Token', 
            // });
            function locateMe(lat,lng){
                var latlng = new google.maps.LatLng(lat, lng);
             image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png';
              mapOptions = {
                 center: new google.maps.LatLng(lat, lng),
                 zoom: 13,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 panControl: true,
                 panControlOptions: {
                     position: google.maps.ControlPosition.TOP_RIGHT
                 },
                 zoomControl: true,
                 zoomControlOptions: {
                     style: google.maps.ZoomControlStyle.LARGE,
                     position: google.maps.ControlPosition.TOP_left
                 }
             },
            map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions),
            marker = new google.maps.Marker({
                 position: latlng,
                 map: map,
                 icon: image
            });

         var input = document.getElementById('searchTextField');
         var autocomplete = new google.maps.places.Autocomplete(input, {
             types: ["geocode"]
         });
         getLocAddress(latlng);
         autocomplete.bindTo('bounds', map);
         infowindow = new google.maps.InfoWindow();

         google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
             infowindow.close();
             var place = autocomplete.getPlace();
             if (place.geometry.viewport) {
                 map.fitBounds(place.geometry.viewport);
             } else {
                 map.setCenter(place.geometry.location);
                 map.setZoom(17);
             }

             moveMarker(place.name, place.geometry.location);
             $('.MapLat').val(place.geometry.location.lat());
             $('.MapLon').val(place.geometry.location.lng());
             zomatoLoc(place.geometry.location.lat(), place.geometry.location.lng());
         });
         google.maps.event.addListener(map, 'click', function (event) {
             $('.MapLat').val(event.latLng.lat());
             $('.MapLon').val(event.latLng.lng());
             infowindow.close();
                     var geocoder = new google.maps.Geocoder();
                     geocoder.geocode({
                         "latLng":event.latLng
                     }, function (results, status) {
                         if (status == google.maps.GeocoderStatus.OK) {
                             var lat = results[0].geometry.location.lat(),
                                 lng = results[0].geometry.location.lng(),
                                 placeName = results[0].address_components[0].long_name,
                                 latlng = new google.maps.LatLng(lat, lng);

                             moveMarker(placeName, latlng);
                             zomatoLoc(lat, lng);
                             $('#searchTextField').val(results[0].formatted_address);
                         }
                     });
         });
     }

            function getLocAddress(latlng){
                var geocoder = new google.maps.Geocoder();
                     geocoder.geocode({
                         "latLng":latlng
                     }, function (results, status) {
                         if (status == google.maps.GeocoderStatus.OK) {
                             var lat = results[0].geometry.location.lat(),
                                 lng = results[0].geometry.location.lng(),
                                 placeName = results[0].address_components[0].long_name,
                                 latlng = new google.maps.LatLng(lat, lng);

                             moveMarker(placeName, latlng);
                             $('#searchTextField').val(results[0].formatted_address);
                             
                         }
                     });
            }
    
        //var lat = 12.972442, lng = 77.580643;
        zomatoLoc(12.972442, 77.580643);
        locateMe(12.972442,77.580643);
        wholeCityInfo(12.9766,77.5993);
        //$state.go("basic");

        function geolocFail(){
            console.log("Error location")
        }

        $scope.findMe = function() {
                if (navigator.geolocation) {
                var location_timeout = setTimeout("geolocFail()", 10000);
                $scope.showSpin = true;
                navigator.geolocation.getCurrentPosition(function(position) {
                    clearTimeout(location_timeout);
                    var lat1 = position.coords.latitude;
                    var lng1 = position.coords.longitude;
                    var latlng = new google.maps.LatLng(lat1, lng1);
                    getLocAddress(latlng);
                    locateMe(lat1, lng1);
                    zomatoLoc(lat1, lng1);
                    //$scope.showSpin = false;
                }, function(error) {
                    clearTimeout(location_timeout);
                    geolocFail();
                });
                } else {
                    geolocFail();
                }
        };
        function moveMarker(placeName, latlng) {
                 marker.setIcon(image);
                 marker.setPosition(latlng);
                 infowindow.setContent(placeName);
            }

        function zomatoLoc(lat, lng){
            $scope.showSpin = true;
                Zomato.init({
                    key: "48cb1d3a7d46ed2913fa7a1e8ca8575a"
                });
                Zomato.geocode({
                    latitude: lat,
                    longitude: lng
                }, function(response) {
                    $scope.$apply(function() {
                    if(response){
                        $scope.allRestaurants = response;
                        $scope.showSpin = false;
                    }else{
                        $scope.allRestaurants = [];
                    }
                });
                    //console.log(s)
                });
        }

        function wholeCityInfo(lat, lng){
                Zomato.init({
                    key: "48cb1d3a7d46ed2913fa7a1e8ca8575a"
                });
                Zomato.geocode({
                    latitude: lat,
                    longitude: lng
                }, function(response) {
                    $scope.$apply(function() {
                    if(response){
                        $scope.fullR = response;
                    }else{
                        $scope.fullR = [];
                    }
                });
                    //console.log(s)
                });
        }

         $scope.$on("viewPressed", function(event, data) {
            viewOne = data.viewOne;
            $scope.resId = data.resId;
            if(viewOne == 1){
                $scope.callRest($scope.resId);
                $state.go('specific');
            }
        });

        $scope.tileSelected =function(resId){
            Zomato.init({
                    key: "48cb1d3a7d46ed2913fa7a1e8ca8575a"
                });
                Zomato.restaurant(resId, function(response) {
                    $scope.$apply(function() {
                    if(response){
                        $scope.oneSelected = response;
                    }else{
                        $scope.oneSelected = [];
                    }
                });
                    //console.log(s)
                });
                 $state.go('menu');
        }


         $scope.goBac = function(){
            $state.go('basic');
         }
         $scope.hideMap =function(){
            $scope.hideCanvas = !$scope.hideCanvas;
         }

        $scope.callRest = function(resId){
            Zomato.init({
                    key: "48cb1d3a7d46ed2913fa7a1e8ca8575a"
                });
                Zomato.restaurant(resId, function(response) {
                    $scope.$apply(function() {
                    if(response){
                        $scope.oneRest = response;
                    }else{
                        $scope.oneRest = [];
                    }
                });
                    //console.log(s)
                });
        }

    $scope.type = 'basic';
    
}]).directive('hotelDetails', ['$rootScope', function($rootScope){
        return {
            restrict: 'E',
            templateUrl: 'src/oneRestDetail.html',
            scope: {
                restaurant:'='
            },
            link: function(scope, elem) {
                    scope.on = function(){
                        scope.overlay = true;
                    }
                    scope.off = function(){
                        scope.overlay = false;
                    }
                    var count = 0;
                    scope.viewOne = function(resId){
                        count +=1;
                        scope.$emit('viewPressed', {
                            viewOne : count,
                            resId : resId
                        });
                    }

                }
            }

 }])
.config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/basic");
    $stateProvider.state("basic", {
        url: "/basic",
        templateUrl: "src/basic.html",
        controller: ""
      }).state("specific", {
        url: "/specific",
        templateUrl: "src/specific.html",
        controller: ""
      }).state("menu", {
        url: "/menu",
        templateUrl: "src/smallTiles.html",
        controller: ""
      });
});