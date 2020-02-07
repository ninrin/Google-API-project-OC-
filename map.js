var map, service;
function initMap (){
	var courn = {lat: 48.9313, lng: 2.3958};
	var options = {
		zoom: 13,
		center: courn,// gps la courneuve par défault
	}
	var map = new google.maps.Map(document.getElementById("googleMap"), options);
	 
	

if (navigator.geolocation) //  renvoie un simple booléen valant vrai ou faux selon la capacité du navigateur à utiliser la géolocalisation 
{
    navigator.geolocation.getCurrentPosition(function(position) // methode .getCurrentPosition sert à récupérer les coordonnées de l'utilisateur
    {
		var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
			map.setCenter(pos);
			var marker = new google.maps.Marker(
			{
				position: pos,
				map: map,
				icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png'
			});
	},function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');

}


console.log(lati1);
console.log(restaurants);

var neighborhoods = [ {lat: lati1, lng: longi1},  {lat: lati2, lng: longi2}];





  for (var i = 0; i < neighborhoods.length; i++) {
	  
    placeMarker(map, neighborhoods[i], arRestaurants[i][0]);
	img(arRestaurants[i][4],arRestaurants[i][5])
addLi(arRestaurants[i][0], arRestaurants[i][0], streetView, arRestaurants[i][1] , arRestaurants[i][2]);

    
  }
  
  






async function placeMarker(map, locat,title) {
	var marker = new google.maps.Marker({
	position: locat,
	map: map,		
	title: title
});  

	var latitude =  locat.lat();
	var longitude =  locat.lng();
	console.log(latitude);
	geocode(latitude, longitude);
	img(latitude, longitude);
}


function placePlaceMarker(map, position){
	service= new google.maps.places.PlacesService(map);


request = {
	location: position,
	radius: 800,
	types: ['restaurant']
	}; 
		
	service.nearbySearch(request, callback); 
	
	google.maps.event.addListener(map, 'rightclick', function(event) {
		map.setCenter(event.latLng)
		
		clearResults(markers) 
		$("#list").empty();
		var request={
			location: event.LatLng,
			radius: 800, 
			types: ['restaurant']
			};
			service.nearbySearch(request, callback);
	})

 function callback(results, status) { 


 if (status == google.maps.places.PlacesServiceStatus.OK){
	 for (var i = 0; i < results.length; i++) {
		
		 markers.push(createMarker(results[i]));
		  var place= results[i];

			var lat = place.geometry.location.lat();
			var lng = place.geometry.location.lng();
			img(lat,lng);
			addLi(place.name, place.name,streetView, place.rating, place.vicinity);

		 }
			toggle();
		 
}
};

		function createMarker(place) { 
		var placeLoc = place.geometry.locatio; 
		var marker= new google.maps.Marker({
			map: map, 
			position: place.geometry.location,
			title: place.name,
			}); 
	
			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.open(map, marker);
				});
				return marker;
		}
		
		function clearResults(markers) {
			for (var m in markers) {
				markers[m].setMap(null)
				}
				markers= []
				
				} 
				
};


  google.maps.event.addListener(map, 'click', function(event) {
   var txt;
  var restaurantName = prompt("Please enter restaurant name:");
  if (restaurantName == null || restaurantName == "") {
    txt = "User cancelled the prompt.";
  } else {
    txt =  restaurantName;
	geocode(event.lat, event.lng);
	addLi(restaurantName, restaurantName,streetView,'', loc);
	  placeMarker(map, event.latLng,restaurantName);
	  placePlaceMarker(map, event.latLng);	
	  
	   

}

console.log(markers);
 
})

}			



var c;
var rate;
var valeurSpan2= [];




function confirmer(){
var valeur;//récupérer la valeur d'un bouton radio correspondant à la note
		var optradioRate = document.getElementsByName("optradioRate");
		for (var i = 0; i < optradioRate.length; i++) {
			if (optradioRate[i].checked ) {
				valeur = optradioRate[i].value;
				console.log(valeur);
			}
		}
		var input = document.getElementById("exampleFormControlTextarea1").value; // valeur dela note
		console.log(input);	

var par = $(c).parent(); // le DIV parent de l'id du boutton cliqué
var content = par.find(".content"); // cible la class content qui contient les commentaires et notes
var allSpan= content.find("span"); // cible les span dans content 
content.append(`<p>${input} <span class =${valeur}> note: ${valeur} </span></p>`);
let note =  par.find('.note').text();
console.log(note);
var valeurSpan; // valeur de la class du span
var valeurSpan2= []; // tableau contenant toute les valeurs (en string) des class des span
valeurSpan2.push(note);
for (let span of allSpan) {
			if (allSpan) {
				valeurSpan = span.className;
				valeurSpan2.push(valeurSpan);
				let finale = valeurSpan2.map(numStr => parseInt (numStr)); // on change les string en numérique pour chaque valeur du array 
				rate = finale.reduce(reducer)/valeurSpan2.length;
				par.find('.note').text(rate);
			}	
		}
console.log(valeurSpan2);
console.log(valeurSpan);


 
}


$('#liste').on('dblclick', 'button', function() {

    var id = $(this).attr('id'); // l'id du boutton cliqué (en valeur seulement)
    console.log(id);  
    $("#myModal").modal();
	 c = document.getElementById(id); // cible l'id du boutton
	 var pari = $(c).parent().find(".note").text(); // permet de récuperer 
	 var num = Number(pari);
	 console.log(num);
	 console.log(pari);
	 
if (pari === 'undefined'){
		console.log('yoyo');
	}
	
	
	 // console.log(pari);
})
	

