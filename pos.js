let streetView;
let loc;
const reducer = (accumulator, currentValue) => accumulator + currentValue; // opération permettant de prendre la valeur totale 

function addLiCol(inner, restaurantName, url, valeur, adresse, valeurDetail, valeurDetail2, valeurDetail3, valeurDetail4, valeurDetail5, commentaire, commentaire2, commentaire3, commentaire4, commentaire5) {  // ajoute une ligne à chaque ajout de markers correspondants
	let ul = $("#list");
	let img = document.createElement("img");
	img.src = url;
	let divs = $(`<div class ="restaurantName"></div>`)
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

	
		if (valeurDetail) {
			let idC = document.getElementById(restaurantName);
			console.log(idC);
			let contents = $(idC).parent().find(".content");
			contents.append(`<p>${commentaire} <span class =${valeurDetail}> note: ${valeurDetail} </span></p>`);
			contents.append(`<p>${commentaire2} <span class =${valeurDetail2}> note: ${valeurDetail2} </span></p>`);
			contents.append(`<p>${commentaire3} <span class =${valeurDetail3}> note: ${valeurDetail3} </span></p>`);
			contents.append(`<p>${commentaire4} <span class =${valeurDetail4}> note: ${valeurDetail4} </span></p>`);
			contents.append(`<p>${commentaire5} <span class =${valeurDetail5}> note: ${valeurDetail5} </span></p>`);
		} else {
			console.log('nothing');
		}
			
	

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

// console.table(arRestaurants);
// console.log(arRestaurants[0][4]);
// console.log(arRestaurants[1][0], arRestaurants[1][1]);


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
			

			let parts = data.results[0].address_components;
			loc = data.results.formatted_address;
			id = data.results[0].place_id;
			// console.log(loc);
			// console.log(parts);

			infoWindow = new google.maps.InfoWindow({
				content:
					"Restaurant"
			});

			marker.addListener('click', function () {
				infoWindow.open(map, marker);

			});

		}).catch(
			err => console.warn(err.message)
		);



}

function placePlaceMarker(map, position) { // place les markers des restaurants alentour
	service = new google.maps.places.PlacesService(map);

	request = {
		location: position,
		radius: 400,
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
		let url2;
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (let i = 0; i < results.length; i++) {
				markers.push(createMarker(results[i]));
				let place = results[i];
				let lat = place.geometry.location.lat();
				let lng = place.geometry.location.lng();
				img(lat, lng);
				placeId= results[i].place_id;
				url2 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyA95IBarLMikquqc-xUBNNL4sIpBrQv9yc`
				fetch(url2)
					.then(responsess => responsess.json())
					.then(datas => {
				
					
							// console.log(datas.result);
							// console.log(datas.result.reviews);
							// console.log(datas.result.reviews[0]);
							let commentaire= datas.result.reviews[0].text
							let commentaire2= datas.result.reviews[1].text
							let commentaire3= datas.result.reviews[2].text
							let commentaire4= datas.result.reviews[3].text
							let commentaire5= datas.result.reviews[4].text

							let valeurDetail = datas.result.reviews[0].rating
							let valeurDetail2 = datas.result.reviews[1].rating
							let valeurDetail3 = datas.result.reviews[2].rating
							let valeurDetail4 = datas.result.reviews[3].rating
							let valeurDetail5 = datas.result.reviews[4].rating
						
							// addLiCol(inner, restaurantName, url, valeur, adresse, valeurDetail, commentaire)
							addLiCol(place.name, place.name, streetView, place.rating, place.vicinity, valeurDetail, valeurDetail2, valeurDetail3, valeurDetail4, valeurDetail5, commentaire,commentaire2,commentaire3,commentaire4,commentaire5);
						
					}).catch(err => console.warn(err.message));
					console.log(placeId);
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




