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





	function placeMarker(map, locat, title) { // place les markers 
		let marker = new google.maps.Marker({
			position: locat,
			map: map,
			title: title
		});

	}


	const getUsers = async function () { // place les markers et la liste des restaurants du fichier JSon
		try {
			let response = await fetch('resto.json')
			if (response.ok) {
				let data = await response.json();
				let stars= []; // prends les valeurs des etoiles dans la fichier json
				for (let index = 0; index < data.length; index++) {
					tableauJson.push([data[index].restaurantName,
					data[index].address,
					data[index].lat,
					data[index].lng,
					data[index].ratings]
					);
					
						// stars.push([tableauJson[index][4]]); console.log(stars[index].stars);

						// for (const key in tableauJson[index][4]) {
						// 	if (tableauJson[index][4].hasOwnProperty(key)) {
						// 		const element = tableauJson[index][4][key];
						// 		console.log(element);
								
						// 	}
						// }
					
					neighborhoods.push([{ lat: data[index].lat, lng: data[index].lng }]);
					
					placeMarker(map, neighborhoods[index][0], tableauJson[index][1]);
					img(tableauJson[index][2], tableauJson[index][3])
					addLiCol(tableauJson[index][0], tableauJson[index][0], img(data[index].lat, data[index].lng), 4, tableauJson[index][1]);
				}
				// console.log(tableauJson);

			} else {
				console.log('retour du serveur', response.status);
			}
		} catch (error) {
			console.log(error);
		}
	}

	getUsers();




	google.maps.event.addListener(map, 'click', function (event) { // ajouter un restaurant manuellement
		let txt;
		let restaurantName = prompt("Veuilez entrer le nom de votre restaurant:");
		if (restaurantName == null || restaurantName == "") {
			txt = "User cancelled the prompt.";
		} else {
			txt = restaurantName;
			addLiCol(restaurantName, restaurantName, img(event.latLng.lat(), event.latLng.lng()), '', geocode(event.latLng.lat(), event.latLng.lng()));
			placeMarker(map, event.latLng, restaurantName);
			placePlaceMarker(map, event.latLng);
		}
	})

}



let idClicked; // reprend l'id cliqué par la souris 
let rate;
let valueSpan2 = [];


function confirmer() {
	let valueOfStar = $('#rating').text()
	let input = document.getElementById("exampleFormControlTextarea1").value; // valeur de du commentaire

	let parent = $(idClicked).parent(); // le DIV parent de l'id du boutton cliqué
	let content = parent.find(".content"); // cible la class content qui contient les commentaires et notes
	content.append(`<p>${input} <span class =${valueOfStar}> note: ${valueOfStar} </span></p>`);
	let allSpan = content.find("span"); // cible les span dans content
	let note = parent.find('.note').text();
	console.log(note);
	let valueSpan; // valeur de la class du span
	let valueSpan2 = []; // tableau contenant toute les valeurs (en string) des class des span
	valueSpan2.push(note);
	for (let span of allSpan) {
		if (allSpan) {
			valueSpan = span.className;
			valueSpan2.push(valueSpan);
			let finale = valueSpan2.map(numStr => parseInt(numStr)); // on change les string en numérique pour chaque valeur du array
			rate = finale.reduce(reducer) / valueSpan2.length;
			parent.find('.note').text(rate);
		}
	}
	
}


let noteGenerales = [];

$('#liste').on('dblclick', 'button', function () { //

	let id = $(this).attr('id'); // l'id du boutton cliqué (en valeur seulement)

	$("#myModal").modal();
	idClicked = document.getElementById(id); // cible l'id du boutton
	// let globalRate = $(idClicked).parent().find(".note").text(); // permet de récuperer la note générale
	// // let num = Number(globalRate);

	// let allNote = document.querySelectorAll('.note');
	
	// for (let index = 0; index < allNote.length; index++) {
	// 	let note = +allNote[index].innerHTML;
	// 	noteGenerales.push(note)
	// }
	// console.log(noteGenerales);
	// let finale = noteGenerales.map(filtre => parseInt(filtre)); // on change les string en numérique pour chaque valeur du array

	// function checkAdult(nb) {
	// 	return nombre <= nb;
	//   }

	//   var valeur;//récupérer la valeur d'un bouton radio
	//   var optradio = document.getElementsByName("optradio");
	//   for (var i = 0; i < optradio.length; i++) {
	// 	  if (optradio[i].checked ) {
	// 		  valeur = optradio[i].value;
	// 		  console.log(valeur);
	// 	  }	
	//   }
})
// // $("#choisir").click(function () {
// // 	let notee = $('.noteG');
// // 	let test;
// // 	// console.log(notee[1].parentElement.attributes[2].nodeValue);
// // 	let parr;
// // 	// parr.css('visibility', 'hidden');
// // 	let selection = document.querySelector('select'); // trouver le nombre d'étoile à filtrer
	
// // 	for (let index = 0; index < notee.length; index++) { // inserer les valeurs notes gloabales
// // 		let note = +notee[index].innerHTML;
// // 		notesGenerales.push(note)
// // 	}


// // 	let selected = selection.selectedIndex; // représente la valeur de du selectedIndex
// // 	// notesGenerales.forEach(element => { // on met les elements du tableau
// // 	// 	test = element.toString();
// // 	// 	notesGenerales.push
// // 	// });


// 	console.log(notesGenerales); 
// 	function checkFilter(selected, nombre) {
// 		return nombre >= selected;
// 	}
// 	// console.log(checkFilter);
// 	// console.log(selected);

// 	let fi = notesGenerales.filter((item) => {
// 		return item >= selected;
// 	});

// 	console.log(fi);


// 	for (let index = 0; index < notesGenerales.length; index++) {
// 		if (notee[index].textContent == fi[0]) {
// 			// console.log(notee[index].textContent);
// 			// parr = notee[index].parentElement.attributes[2].nodeValue;
// 			// $(`#${parr}`).hide();
// 			console.log('ca match!!');

// 		}
// 	}

// });


