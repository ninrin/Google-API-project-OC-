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
	  
    addMarkerJson(neighborhoods[i]);


    
  }
marker = new google.maps.Marker({
      
    });


	function addMarkerJson(position) { 
		var marker= new google.maps.Marker({
			map: map, 
			position: position
			}); 
	

			google.maps.event.addListener(marker, 'click', function(){
				img(lati2, longi2);
img(lati1, longi1);
geocode(lati2, longi2);
geocode(lati1, longi1);

				infoWindow.open(map, marker);
				});

		}









  google.maps.event.addListener(map, 'click', function(event) {
	i
   var txt;
  var restaurantName = prompt("Please enter restaurant name:");
  if (restaurantName == null || restaurantName == "") {
    txt = "User cancelled the prompt.";
  } else {
    txt =  restaurantName;
	

	addLi(restaurantName, restaurantName);
	  placeMarker(map, event.latLng,restaurantName);
	   markers.push(placeMarker());
	   var x = document.querySelectorAll("button.id");
	  

}


 function placeMarker(map, location,title) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
	 title: title
  
  });
  
 
  
 var latitude =  location.lat();
 var longitude =  location.lng();
var latng = {lat: latitude, lng: longitude};
console.log(latng);
geocode(latitude, longitude);
img(latitude, longitude);
	  
   



  
   
  service= new google.maps.places.PlacesService(map);


request = {
	location: latng ,
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
			radius: 8000, 
			types: ['restaurant']
			};
			service.nearbySearch(request, callback);
	})

 function callback(results, status) { 


 if (status == google.maps.places.PlacesServiceStatus.OK){
	 for (var i = 0; i < results.length; i++) {
		
		 markers.push(createMarker(results[i]));
		  var place= results[i];

			console.log(markers[i].title);

			// txtz = "Nom du restaurant: " + place.name  + "Rating: " + place.rating
			addLi(place.name, place.name,place.rating);

		 }
			toggle();
		 
}
};
		

		function createMarker(place) { 
		var placeLoc = place.geometry.location; 
		var marker= new google.maps.Marker({
			map: map, 
			position: place.geometry.location,
			title: place.name,
			}); 
	// var infowindows = new google.maps.InfoWindow({
    // content:  
	// "<div style='float:left'>"+ "<img src=" + streetView +  ">" + "</div>" + "<div style='float:right; padding: 10px;'>" + "<strong>Address:</strong>" + place.name + "</div>"+ "</br>" + "<strong>Rating:</strong>" + place.rating + "</div>"

  // }); 

			google.maps.event.addListener(marker, 'click', function(){
				// infowindows.setContent(place.name);
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



				

}
})

}			



var c;
var rate;



// $(document).ready(function(){
  // $("#myBtn").click(function(){
    // $("#myModal").modal();
  // });
// });

function confirmer(){

var valeur;//récupérer la valeur d'un bouton radio
		var optradioRate = document.getElementsByName("optradioRate");
		for (var i = 0; i < optradioRate.length; i++) {
			if (optradioRate[i].checked ) {
				valeur = optradioRate[i].value;
				console.log(valeur);
			}
		}
		var input = document.getElementById("newRatingForm").value; 
		console.log(input);	
		 // $("<p>" +input + "<span data-class =" + valeur + ">" + "note:"+ valeur + "</span></p>").insertAfter(c);
// $(c).find(".content").css("background-color", "lightBlue");
var par = $(c).parent();
var parente = par.find(".content");
parente2= parente.find("span");
parente.append("<p>" +input + "<span class =" +valeur +"> note:"+ valeur + "</span></p>");


var valeurSpan; // valeur de la class
var valeurSpan2= []; // tableau contenant toute les valeurs (en string)
const reducer = (accumulator, currentValue) => accumulator + currentValue; // opération permettant de prendre la valeur totale 
for (var i = 0; i < parente2.length; i++) {
			if (parente2[i]) {
				valeurSpan = parente2[i].className;
				valeurSpan2.push(valeurSpan);
				var finale = valeurSpan2.map(numStr => parseInt (numStr)); // on change les string in numérique
				rate = finale.reduce(reducer)/valeurSpan2.length;
			}	
		}
console.log(valeurSpan2);



 console.log(finale.reduce(reducer));
console.log(rate);

 
}


$('#liste').on('click', 'button', function() {

    var id = $(this).attr('id');
    console.log(id);  
	// id.setAttribute("p", input);
    $("#myModal").modal();
	// $( "#id content").append("<p> input <p>");
	 c = document.getElementById(id);
	 // console.log(dataset.id);
})
	

