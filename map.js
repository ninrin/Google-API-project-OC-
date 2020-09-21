let map, service;
function initMap() {
	let courn = { lat: 48.9313, lng: 2.3958 };
	let options = {
		zoom: 13,
		center: courn,// gps la courneuve par défault
	}
	let map = new google.maps.Map(document.getElementById("googleMap"), options);



	if (navigator.geolocation) {//  renvoie un simple booléen valant vrai ou faux selon la capacité du navigateur à utiliser la géolocalisation

		navigator.geolocation.getCurrentPosition(function (position) { // methode .getCurrentPosition sert à récupérer les coordonnées de l'utilisateur
			let pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			map.setCenter(pos);
			let marker = new google.maps.Marker({
				position: pos,
				map: map,
				icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png'
			});
		}, function () {
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


	let neighborhoods = [{ lat: lati1, lng: longi1 }, { lat: lati2, lng: longi2 }];

	for (let i = 0; i < neighborhoods.length; i++) {

		placeMarker(map, neighborhoods[i], arRestaurants[i][0]);
		img(arRestaurants[i][4], arRestaurants[i][5])
		addLiCol(arRestaurants[i][0], arRestaurants[i][0], streetView, arRestaurants[i][1], arRestaurants[i][2]);
	}



	async function placeMarker(map, locat, title) { // place les markers saisi manuellement
		let marker = new google.maps.Marker({
			position: locat,
			map: map,
			title: title
		});

		let latitude = locat.lat();
		let longitude = locat.lng();
		geocode(latitude, longitude);
		img(latitude, longitude);
	}





	google.maps.event.addListener(map, 'click', function (event) {
		let txt;
		let restaurantName = prompt("Veuilez entrer le nom de votre restaurant:");
		if (restaurantName == null || restaurantName == "") {
			txt = "User cancelled the prompt.";
		} else {
			txt = restaurantName;
			geocode(event.lat, event.lng);
			addLiCol(restaurantName, restaurantName, streetView, '', loc);
			placeMarker(map, event.latLng, restaurantName);
			placePlaceMarker(map, event.latLng);
		}
	})

}



let idCliqué;
let rate;
let valeurSpan2 = [];


function confirmer() {
	let valeur = $('#rating').text()
	let input = document.getElementById("exampleFormControlTextarea1").value; // valeur dela note

	let par = $(idCliqué).parent(); // le DIV parent de l'id du boutton cliqué
	console.log(par);
	let content = par.find(".content"); // cible la class content qui contient les commentaires et notes
	content.append(`<p>${input} <span class =${valeur}> note: ${valeur} </span></p>`);
	let allSpan = content.find("span"); // cible les span dans content
	let note = par.find('.note').text();
	console.log(note);
	let valeurSpan; // valeur de la class du span
	let valeurSpan2 = []; // tableau contenant toute les valeurs (en string) des class des span
	valeurSpan2.push(note);
	for (let span of allSpan) {
		if (allSpan) {
			valeurSpan = span.className;
			valeurSpan2.push(valeurSpan);
			let finale = valeurSpan2.map(numStr => parseInt(numStr)); // on change les string en numérique pour chaque valeur du array
			rate = finale.reduce(reducer) / valeurSpan2.length;
			par.find('.note').text(rate);
		}
	}
	$('.fas fa-star checked').classList.remove("checked");
	console.log(valeurSpan2);



}

// let allNote = $('#liste').find('.note').html();

let notesGn = [];

$('#liste').on('dblclick', 'button', function () { //

	let id = $(this).attr('id'); // l'id du boutton cliqué (en valeur seulement)

	$("#myModal").modal();
	idCliqué = document.getElementById(id); // cible l'id du boutton
	let globalRate = $(idCliqué).parent().find(".note").text(); // permet de récuperer la note générale
	let num = Number(globalRate);


	if (globalRate === 'undefined') {
		console.log('yoyo');
	}
	let allNote = document.querySelectorAll('.note');
	// allNote.append('yo');
	console.log(allNote[0].innerHTML);
	console.log( allNote.length);

	for (let index = 0; index < allNote.length; index++) {
		let note = +allNote[index].innerHTML;
		notesGn.push(note)
	}
	console.log(notesGn);
	let finale = notesGn.map(filtre => parseInt(filtre)); // on change les string en numérique pour chaque valeur du array

	function checkAdult(nb) {
		return nombre <= nb;
	  }

	  var valeur;//récupérer la valeur d'un bouton radio
	  var optradio = document.getElementsByName("optradio");
	  for (var i = 0; i < optradio.length; i++) {
		  if (optradio[i].checked ) {
			  valeur = optradio[i].value;
			  console.log(valeur);
		  }	
	  }
})
function filtres(params) {
	let allNote = document.querySelectorAll('.note');
	// allNote.append('yo');
	console.log(allNote[0].innerHTML);
	console.log( allNote.length);

	for (let index = 0; index < allNote.length; index++) {
		noteGn.push(allNote[i].innerHTML)
	}
	console.log(notesGn);
}

let div = $('#etoile');

function addStar(star) {
	let mot = $(`<span class= "fas fa-star"></span>`).attr("data-star", star);
	div.append(mot);
}

for (let index = 1; index < 6; index++) {
	addStar(index)
}

const allStars = document.querySelectorAll(".fa-star");
console.log("allStars", allStars);
const highlightedStars = [];
const rating = document.querySelector("#rating");

init();

function init() {
	allStars.forEach((star) => {
		star.addEventListener("click", saveRating);
		star.addEventListener("mouseover", addCSS);
		star.addEventListener("mouseleave", removeCSS);
	});
}

function saveRating(e) {
	console.log(e, e.target, e.target.nodeName, e.target.nodeType);
	console.dir(e.target);
	console.log(e.target.dataset);
	removeEventListenersToAllStars();
	rating.innerText = e.target.dataset.star;
}

function removeEventListenersToAllStars() {
	allStars.forEach((star) => {
		star.removeEventListener("click", saveRating);
		star.removeEventListener("mouseover", addCSS);
		star.removeEventListener("mouseleave", removeCSS);

	});
}

function addCSS(e, css = "checked") {
	const overedStar = e.target;
	overedStar.classList.add(css);
	const previousSiblings = getPreviousSiblings(overedStar);
	console.log("previousSiblings", previousSiblings);
	previousSiblings.forEach((elem) => elem.classList.add(css));
}

function removeCSS(e, css = "checked") {
	const overedStar = e.target;
	overedStar.classList.remove(css);
	const previousSiblings = getPreviousSiblings(overedStar);
	previousSiblings.forEach((elem) => elem.classList.remove(css));
}

function getPreviousSiblings(elem) {
	console.log("elem.previousSibling", elem.previousSibling);
	let sibs = [];
	const spanNodeType = 1;
	while ((elem = elem.previousSibling)) {
		if (elem.nodeType === spanNodeType) {
			sibs = [elem, ...sibs];
		}
	}
	return sibs;
}

