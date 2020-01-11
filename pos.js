var streetView;
var loc;


function img(latitude, longitude){
	
		 const LAT = latitude;
		 const LNG = longitude;

		  streetView =   `https://maps.googleapis.com/maps/api/streetview?size=100x100&location=${LAT},${LNG}&heading=151.78&pitch=-0.76&key=AIzaSyA95IBarLMikquqc-xUBNNL4sIpBrQv9yc`;

	  }
	  
  function addLi(inner, restaurantName, valeur) {
  var ul = document.getElementById("list");

  var divs = document.createElement("div"); 
  divs.setAttribute("class", restaurantName);
  divs.setAttribute("data-class", valeur);
var btn = document.createElement("BUTTON");                            
btn.setAttribute("type", "boutton");
btn.setAttribute("id", restaurantName);
btn.classList.add("collapsible");
btn.append("nom de restaurant="+ inner + " note:"+ valeur);

ul.appendChild(divs);
divs.appendChild(btn);


var div = document.createElement('div');
div.setAttribute('class', 'content');




divs.appendChild(div);

}

function addRes(inner, restaurantName) {
  var ul = document.getElementById("list1");
  
var btn = document.createElement("BUTTON");               
var p = document.createElement("p");               
btn.setAttribute("id", restaurantName);
btn.setAttribute("type", "boutton");
btn.classList.add("collapsible");
btn.appendChild(document.createTextNode(inner));

ul.appendChild(btn);


var div = document.createElement('div');
div.setAttribute('class', 'content');
div.appendChild(p);
// p.textContent = "Commentaire:" + com + "rating:" + rate; 


ul.appendChild(div);

}


var markers = []; 





function toggle(){

var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    }  else {
      content.style.display = "block";

    }
  });
}
}

const datas = [{
        "restaurantName": "Bronco",
        "address": "39 Rue des Petites Écuries, 75010 Paris",
        "lat": 48.8737815,
        "lng": 2.3501649,
        "ratings": [{
                "stars": 4,
                "comment": "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
            },
            {
                "stars": 5,
                "comment": "Tout simplement mon restaurant préféré !"
            }
        ]
    },
    {
        "restaurantName": "Babalou",
        "address": "4 Rue Lamarck, 75018 Paris",
        "lat": 48.8865035,
        "lng": 2.3442197,
        "ratings": [{
                "stars": 5,
                "comment": "Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
            },
            {
                "stars": 3,
                "comment": "J'ai trouvé ça correct, sans plus"
            }
        ]
    }
];

let arRestaurants = [];

for (const object of restaurants) { // la variable object prend les informations de chaque index dans de la variable array de data; dans une boucle

 let
        restaurant = object['restaurantName']; //restaurant reprend les noms des restaurants		
        note = null; // 
		adresse = object['address'];
		commentaire = object['comment'];
		lati = object['lat'];
		longi = object['lng'];

    for ( const rating of object['ratings'] ){
        note += Number(rating['stars']); // note contiendra les nombres total des notes de chaque index
    }
console.log(note);
    note = ( note / object['ratings'].length ).toFixed(1); //calcul de moyenne 
    arRestaurants.push( [ restaurant, note, adresse, commentaire, lati, longi]);
}

console.table(arRestaurants);
console.log(arRestaurants[0][3]);
console.log(arRestaurants[1][0], arRestaurants[1][1]);


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

 





 function geocode(lat, lng){
      const LAT = lat;
      const LNG = lng;
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=AIzaSyA95IBarLMikquqc-xUBNNL4sIpBrQv9yc`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let parts = data.results[0].address_components;
            var loc = data.results[0].formatted_address;
   infoWindow = new google.maps.InfoWindow({
    content:  
	"<div style='float:left'>"+ "<img src=" + streetView +  ">" + "</div>" + "<div style='float:right; padding: 10px;'>" + "<strong>Addresse:</strong>" + loc + "</div>"
	});

  marker.addListener('click', function() {
    infoWindow.open(map, marker);

  });
  

        })
        .catch(err => console.warn(err.message));

   }
   
  
// geocode(latitude, longitude);

// var valeurRate1Rate1;//récupérer la valeurRate1 d'un bouton radio
		// var optradio = document.getElementsByName("optradio");
		// for (var i = 0; i < optradio.length; i++) {
			// if (optradio[i].checked ) {
				// valeurRate1 = optradio[i].value;
			// }	
		// }
		
		// var valeurRate2;//récupérer la valeurRate1 d'un bouton radio
		// var optradio = document.getElementsByName("optradio2");
		// for (var i = 0; i < optradio2.length; i++) {
			// if (optradio2[i].checked ) {
				// valeurRate2 = optradio2[i].value;
			// }	
		// }
		
		// if ( valeurRate1 == 1 && valeurRate1 == 1) {
			
		// } else if (  valeurRate1 == 2) {
			// document.getElementById('citation').innerHTML = citations[type.selectedIndex][0][aleatoire] + citations[type.selectedIndex][1][aleatoire2] + citations[type.selectedIndex][2][aleatoire3] + citations[type.selectedIndex][3][aleatoire4];
			// document.getElementById('citation2').innerHTML = citations[type.selectedIndex][0][aleatoire2] + citations[type.selectedIndex][1][aleatoire3] + citations[type.selectedIndex][2][aleatoire4] + citations[type.selectedIndex][3][aleatoire5];
		// } else if (valeurRate1 == 3) {
			// document.getElementById('citation').innerHTML =citations[type.selectedIndex][0][aleatoire] + citations[type.selectedIndex][1][aleatoire2] + citations[type.selectedIndex][2][aleatoire3] + citations[type.selectedIndex][3][aleatoire4];
			// document.getElementById('citation2').innerHTML =citations[type.selectedIndex][0][aleatoire2] + citations[type.selectedIndex][1][aleatoire3] + citations[type.selectedIndex][2][aleatoire4] + citations[type.selectedIndex][3][aleatoire5];
			// document.getElementById('citation3').innerHTML = citations[type.selectedIndex][0][aleatoire3] + citations[type.selectedIndex][1][aleatoire4] + citations[type.selectedIndex][2][aleatoire5] + citations[type.selectedIndex][3][aleatoire];
		// } else if (valeurRate1 == 4) {
			// document.getElementById('citation').innerHTML =citations[type.selectedIndex][0][aleatoire] + citations[type.selectedIndex][1][aleatoire2] + citations[type.selectedIndex][2][aleatoire3] + citations[type.selectedIndex][3][aleatoire4];
			// document.getElementById('citation2').innerHTML =	citations[type.selectedIndex][0][aleatoire2] + citations[type.selectedIndex][1][aleatoire3] + citations[type.selectedIndex][2][aleatoire4] + citations[type.selectedIndex][3][aleatoire5];
			// document.getElementById('citation3').innerHTML =citations[type.selectedIndex][0][aleatoire3] + citations[type.selectedIndex][1][aleatoire4] + citations[type.selectedIndex][2][aleatoire5] + citations[type.selectedIndex][3][aleatoire];
			// document.getElementById('citation4').innerHTML =citations[type.selectedIndex][0][aleatoire4] + citations[type.selectedIndex][1][aleatoire5] + citations[type.selectedIndex][2][aleatoire] + citations[type.selectedIndex][3][aleatoire2];
		// } else if ( valeurRate1 == 5) {
			// document.getElementById('citation').innerHTML =citations[type.selectedIndex][0][aleatoire] + citations[type.selectedIndex][1][aleatoire2] + citations[type.selectedIndex][2][aleatoire3] + citations[type.selectedIndex][3][aleatoire4];
			// document.getElementById('citation2').innerHTML =citations[type.selectedIndex][0][aleatoire2] + citations[type.selectedIndex][1][aleatoire3] + citations[type.selectedIndex][2][aleatoire4] + citations[type.selectedIndex][3][aleatoire5];
			// document.getElementById('citation3').innerHTML =citations[type.selectedIndex][0][aleatoire3] + citations[type.selectedIndex][1][aleatoire4] + citations[type.selectedIndex][2][aleatoire5] + citations[type.selectedIndex][3][aleatoire];
			// document.getElementById('citation4').innerHTML =citations[type.selectedIndex][0][aleatoire4] + citations[type.selectedIndex][1][aleatoire5] + citations[type.selectedIndex][2][aleatoire] + citations[type.selectedIndex][3][aleatoire2];
			// document.getElementById('citation5').innerHTML =citations[type.selectedIndex][0][aleatoire5] + citations[type.selectedIndex][1][aleatoire] + citations[type.selectedIndex][2][aleatoire2] + citations[type.selectedIndex][3][aleatoire3];
		// }  				
	// } 