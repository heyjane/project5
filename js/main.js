var map;
var icon;
var coffeeIcon = 'img/coffee-icon.png';
var yogaIcon = 'img/yoga-icon.png';
var markersArray = [];

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=false&callback=initialize';
  document.body.appendChild(script);
}
window.onload = loadScript;

function initialize() {
	var mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(38.906416, -77.065831),
		disableDefaultUI: true,
		mapTypeControl:false,
	};
	if ($(window).width() <=600) {
		mapOptions.zoom = 12;
	}
	else if ($(window).width() >=1020) {
		mapOptions.zoom = 14;
	}
	if ($(window).width() < 850 || $(window).height() < 600) {
		hideNav();
	}

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	setMarkers(markers);

	setAllMap();

	function resetMap() {
		var windowWidth = $(window).width();
		if (windowWidth <= 600) {
			map.setZoom(12);
			map.setCenter(mapOptions.center);
		}
		else {
			map.setZoom(13);
			map.setCenter(mapOptions.center);
		}
	}
	$("#reset").click(function() {
		resetMap();
	});
	$(window).resize(function() {
		resetMap();
	});
}

function setAllMap() {
	for (var i=0; i < markers.length; i++) {
		if (markers[i].boolTest === true) {
			markers[i].holdMarker.setMap(map);
		}
		else {
			markers[i].holdMarker.setMap(null);
		}
	}
}

var markers = [
	{
	name: 'Baked and Wired',
	lat: 38.903692,
	longitude: -77.060135,
	streetAddress: '1052 Thomas Jefferson St NW',
	category: 'coffee',
	info: 'Baked and Wired info window content here',
	visible: ko.observable(true),
	boolTest: true,
	id: "nav0"
	},

	{
	name: 'Filter Coffeehouse & Espresso Bar',
	lat: 38.9136809,
	longitude: -77.045109,
	streetAddress: '1726 20th St NW',
	category: 'coffee',
	info: 'Filter C&E Bar info window content here',
	visible: ko.observable(true),
	boolTest: true,
	id: "nav1"
	},

	{
	name: 'Yoga Del Sol',
	lat: 38.909793,
	longitude: -77.064334,
	streetAddress: '1519 Wisconsin Ave NW',
	category: 'yoga',
	info: 'Yoga Del Sol info window content here',
	visible: ko.observable(true),
	boolTest: true,
	id: "nav2"
	},

	{
	name: 'Down Dog Power Yoga',
	lat: 38.904375,
	longitude: -77.065466,
	streetAddress: '1046 Potomac St NW',
	category: 'yoga',
	info: 'Down Dog Power Yoga info window content here',
	visible: ko.observable(true),
	boolTest: true,
	id: "nav3"
	},

	{
	name: 'Core Power Georgetown',
	lat: 38.903162,
	longitude: -77.059702,
	streetAddress: '1025 Thomas Jefferson St NW',
	category: 'yoga',
	info: 'Core Power Georgetown info window content here',
	visible: ko.observable(true),
	boolTest: true,
	id: "nav4"
	},

	{
	name: 'Georgetown Yoga',
	lat: 38.905488,
	longitude: -77.057290,
	streetAddress: '1025 Thomas Jefferson St NW',
	category: 'yoga',
	info: 'Georgetown Yoga info window content here',
	visible: ko.observable(true),
	boolTest: true,
	id: "nav5"
	},

	{
	name: 'La Colombe Torrefaction',
	lat: 38.906951,
	longitude: -77.024927,
	streetAddress: '924 N St NW',
	category: 'coffee',
	info: 'La Colombe info window content here',
	visible: ko.observable(true),
	boolTest: true,
	id: "nav6"
	},

	{
	name: 'Slipstream',
	lat: 38.908364,
	longitude: -77.031591,
	streetAddress: '1333 14th St NW',
	category: 'coffee',
	info: 'Slipstream info window content here',
	visible: ko.observable(true),
	boolTest: true,
	id: "nav7"
	}
];

function setMarkers(location) {
	for (i=0; i<location.length; i++){

		if (location[i].category === "coffee") {
			icon = coffeeIcon
		}
		else if (location[i].category === "yoga") {
			icon = yogaIcon
		}

		location[i].holdMarker = new google.maps.Marker({
			position: new google.maps.LatLng(location[i].lat, location[i].longitude),
			map: map,
			title: location[i].name,
			icon: icon,
		});

		markers[i].contentString = location[i].info;

		var infowindow = new google.maps.InfoWindow({
			content: markers[i].contentString
		});

		new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
			return function () {
				infowindow.setContent(location[i].contentString);
				infowindow.open(map,this);
				var windowWidth = $(window).width();
				if(windowWidth <= 1080) {
					map.setZoom(14);
				}
				else {
					map.setZoom(16);
				}
				map.setCenter(marker.getPosition());
			};
		})(location[i].holdMarker, i));

		var searchNav = $('#nav' + i);
		searchNav.click((function(marker, i) {
			return function() {
				infowindow.setContent(location[i].contentString);
				infowindow.open(map,marker);
				map.setZoom(16);
				map.setCenter(marker.getPosition());
			};
		})(location[i].holdMarker, i));
	}
}
var viewModel = {
	query: ko.observable(''),
};

viewModel.markers = ko.dependentObservable(function() {
	var self = this;
	var search = self.query().toLowerCase();
	return ko.utils.arrayFilter(markers, function(marker) {
		if (marker.name.toLowerCase().indexOf(search) >=0 || marker.category.toLowerCase().indexOf(search) >=0) {
			marker.boolTest = true;
			return marker.visible(true);
		}
		else {
			marker.boolTest = false;
			setAllMap();
			return marker.visible(false);
		}
	});
}, viewModel);

ko.applyBindings(viewModel);

$("#input").keyup(function() {
	setAllMap();
});

var isNavVisible = true;
function noNav() {
	$("#search-nav").animate({
		height: 65,
	}, 500);
	$("#arrow").attr("src", "img/down-arrow.png");
	isNavVisible = false;
}

function yesNav() {
	$("#search-nav").show();
	var scrollerHeight = $("#scroller").height() + 55;
	if ($(window).height() < 600) {
		$("#search-nav").animate({
			height: scrollerHeight - 100,
		}, 500, function() {
			$(this).css('height', 'auto').css("max-height", 439);
		});
	}
	else {
		$("#search-nav").animate({
			height: scrollerHeight,
		}, 500, function() {
			$(this).css('height', 'auto').css("max-height", 549);
		});
	}
	$("#arrow").attr("src", "img/up-arrow.png");
	isNavVisible = true;
}

function hideNav() {
    if(isNavVisible === true) {
            noNav();

    } else {
            yesNav();
    }
}
$("#arrow").click(hideNav);

$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 850 && isNavVisible === true) {
            noNav();
        } else if($(window).height() < 600 && isNavVisible === true) {
            noNav();
        }
    if ($(window).width() >= 850 && isNavVisible === false) {
            if($(window).height() > 600) {
                yesNav();
            }
        } else if($(window).height() >= 600 && isNavVisible === false) {
            if($(window).width() > 850) {
                yesNav();
            }
        }
});
