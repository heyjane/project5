// center the map on Georgetown
var map;
function initialize(){
	var mapOptions = {
		zoom: 15,
		center: new google.maps.LatLng(38.9097057, -77.06535650000001),
		panControl: true,
		zoomControl: true,
		scaleControl: true
	};
	map=new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	var coffeeIcon = 'images/coffee-icon.png';
	var yogaIcon = 'images/yoga-icon.png';
	setMarkers(map, coffee, coffeeIcon);
	setMarkers(map, yoga, yogaIcon);

}

var coffee = [
['Baked and Wired', 38.903692, -77.060135],
['Filter Coffeehouse & Espresso Bar', 38.9136809, -77.045109]
];


var yoga = [
['Yoga Del Sol', 38.909793, -77.064334],
['Down Dog Power Yoga', 38.904375, -77.065466]
];


var contentString = 'infowindow content here';
var infowindow = new google.maps.InfoWindow({
	content: contentString
});

function setMarkers(map, locations, icon) {
	for (var i=0; i < locations.length; i++) {
		var markerLocation = locations[i];
		var myLatLng = new google.maps.LatLng(markerLocation[1], markerLocation[2]);

		var marker = new google.maps.Marker({
			position: myLatLng,
			map:map,
			icon: icon,
			title: markerLocation[0]
		});
	}

google.maps.event.addListener(marker, 'click', function() {
	infowindow.open(map, marker);
});
};

google.maps.event.addDomListener(window, 'load', initialize);


