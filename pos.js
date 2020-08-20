let streetView;
let loc;
const reducer = (accumulator, currentValue) => accumulator + currentValue; // opération permettant de prendre la valeur totale 

function addLiCol(inner, restaurantName, url, valeur, adresse) {  // ajoute une ligne à chaque ajout de markers correspondants
	let ul = $("#list");
	let img = document.createElement("img");
	img.src = url;
	let divs= $(`<div class ="restaurantName"></div>`)
	let btn = $(`<button type="boutton" class= "collapsible"></button>`).attr("id", restaurantName)
	let ifValeur = valeur || 0 // si il y a pas de valeur, alors la valeur de note équivaut à 0
	let txt1 = $("<span></span>").text(inner);
	let txt2 = $("<span></span>").addClass("note").text(ifValeur);
	// for (let i = 0; i < ifValeur; i++) {
	// 	const element = array[i];
		
	// }
	let txt3 = $("<p></p>").text("adresse : " + adresse);
	$(btn).append(txt1, txt2, txt3);   // Append new elements
	ul.append(divs);
	divs.append(btn);
	btn.append(img);
	let div = $(`<div class= "ccontent"></div>`).attr("class", 'content');
	divs.append(div);
}




let markers = [];
let marker = [];


function toggle() { // fonction pour dérouler le collapsible et voir le content des notes et commentaires ajoutés
	let coll = document.getElementsByClassName("collapsible");
	let i;
	for (let colls of coll) {
		colls.addEventListener("click", function () {
			this.classList.toggle("active");
			let content = this.nextElementSibling;
			if (content.style.display === "block") {
				content.style.display = "none";
			} else {
				content.style.display = "grid";
			};
		});
	}
}



let arRestaurants = [];

for
	(const object of restaurants) { // la variable object prend les informations de chaque index dans de la variable array de data; dans une boucle

	let
		restaurant = object['restaurantName']; //restaurant reprend les noms des restaurants		
	note = null; // 
	adresse = object['address'];
	commentaire = object['comment'];
	lati = object['lat'];
	longi = object['lng'];

	for (const rating of object['ratings']) {
		note += Number(rating['stars']); // note contiendra les nombres total des notes de chaque index
	}
	console.log(note);
	note = (note / object['ratings'].length).toFixed(1); //calcul de moyenne 
	arRestaurants.push([restaurant, note, adresse, commentaire, lati, longi]);
}




let nom1 = arRestaurants[0][0];
nom1 = arRestaurants[1][0];

let note1 = arRestaurants[0][1];
note2 = arRestaurants[1][1];

let adresse1 = arRestaurants[0][2];
adresse2 = arRestaurants[1][2];


let commentaire1 = arRestaurants[0][3];
commentaire2 = arRestaurants[1][3];

let lati1 = arRestaurants[0][4];
lati2 = arRestaurants[1][4];

let longi1 = arRestaurants[0][5];
longi2 = arRestaurants[1][5];

console.table(arRestaurants);
console.log(arRestaurants[0][4]);
console.log(arRestaurants[1][0], arRestaurants[1][1]);


const img = (latitude, longitude) => { // fonction pour ajouter l'image du restaurant en fonction de lat/lng
	const LAT = latitude;
	const LNG = longitude;
	streetView = `https://maps.googleapis.com/maps/api/streetview?size=100x100&location=${LAT},${LNG}&heading=151.78&pitch=-0.76&key=AIzaSyA95IBarLMikquqc-xUBNNL4sIpBrQv9yc`;
}



const geocode = (lat, lng) => {
	const LAT = lat;
	const LNG = lng;
	let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=AIzaSyA95IBarLMikquqc-xUBNNL4sIpBrQv9yc`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			let parts = data.results[0].address_components;
			loc = data.results[0].formatted_address;
			console.log(loc);
			console.log(parts);

			infoWindow = new google.maps.InfoWindow({
				content:
					"Restaurant"
			});

			marker.addListener('click', function () {
				infoWindow.open(map, marker);

			});

		}).catch(err => console.warn(err.message));

}

function placePlaceMarker(map, position) { // place les markers des restaurants alentour
	service = new google.maps.places.PlacesService(map);

	request = {
		location: position,
		radius: 800,
		types: ['restaurant']
	};

	service.nearbySearch(request, callback);

	google.maps.event.addListener(map, 'rightclick', function (event) {
		map.setCenter(event.latLng)
		clearResults(markers)
		$("#list").empty();
		let request = {
			location: event.LatLng,
			radius: 800,
			types: ['restaurant']
		};
		service.nearbySearch(request, callback);
	})

	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (let i = 0; i < results.length; i++) {
				markers.push(createMarker(results[i]));
				let place = results[i];
				let lat = place.geometry.location.lat();
				let lng = place.geometry.location.lng();
				img(lat, lng);
				addLiCol(place.name, place.name, streetView, place.rating, place.vicinity);
			}
			toggle();
		}
	};

	function createMarker(place) {
		let placeLoc = place.geometry.locatio;
		let marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			title: place.name,
		});

		google.maps.event.addListener(marker, 'click', function () {
			infoWindow.open(map, marker);
		});
		return marker;
	}
	function clearResults(markers) {
		for (let m in markers) {
			markers[m].setMap(null)
		}
		markers = []

	}

};




