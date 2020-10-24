// let streetView;
const reducer = (accumulator, currentValue) => accumulator + currentValue; // opération permettant de prendre la valeur totale 

function addLiCol(inner, restaurantName, url, valeur, adresse, valeurDetail, valeurDetail2, valeurDetail3, valeurDetail4, valeurDetail5, commentaire, commentaire2, commentaire3, commentaire4, commentaire5) {  // ajoute une ligne à chaque ajout de markers correspondants
	let ul = $("#list");
	let img = document.createElement("img");
	img.src = url; // ajoute l'image du restaurant
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

	
		if (valeurDetail) { // on créer les 5 <p> qui contiendront les commentaires des utilisateurs déjà enregistrés
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



const img = (latitude, longitude) => { // fonction pour ajouter l'image du restaurant en fonction de lat/lng
	const LAT = latitude;
	const LNG = longitude;
	let streetView;
	return streetView = `https://maps.googleapis.com/maps/api/streetview?size=100x100&location=${LAT},${LNG}&heading=151.78&pitch=-0.76&key=AIzaSyA95IBarLMikquqc-xUBNNL4sIpBrQv9yc`;
}


const geocode = (lat, lng) => {
	const LAT = lat;
	const LNG = lng;
	let loc;
	let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=AIzaSyA95IBarLMikquqc-xUBNNL4sIpBrQv9yc`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			infoWindow = new google.maps.InfoWindow({
				content:
					"Restaurant"
			});

			// marker.addListener('click', function () {
			// 	infoWindow.open(map, marker);
			// });
			return data.results[0].formatted_address;

		})



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
				// img(lat, lng);
				placeId = results[i].place_id;
				url2 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyA95IBarLMikquqc-xUBNNL4sIpBrQv9yc`

				fetch(url2)
					.then(responsess => responsess.json())
					.then(datas => {

						// console.log(datas.result.reviews[0].text);
						let commentaire = datas.result.reviews[0].text
						let commentaire2 = datas.result.reviews[1].text
						let commentaire3 = datas.result.reviews[2].text
						let commentaire4 = datas.result.reviews[3].text
						let commentaire5 = datas.result.reviews[4].text

						let valeurDetail = datas.result.reviews[0].rating;
						let valeurDetail2 = datas.result.reviews[1].rating
						let valeurDetail3 = datas.result.reviews[2].rating;
						let valeurDetail4 = datas.result.reviews[3].rating
						let valeurDetail5 = datas.result.reviews[4].rating
						addLiCol(place.name, place.name, img(lat, lng), place.rating, place.vicinity, valeurDetail, valeurDetail2, valeurDetail3, valeurDetail4, valeurDetail5, commentaire, commentaire2, commentaire3, commentaire4, commentaire5);
					}).catch(err => console.warn(err.message));
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




let tableauJson = [];
let neighborhoods = [];

