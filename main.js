
'use strict';
const refugeAPI_Search= "https://refugerestrooms.org:443/api/v1/restrooms/search.json"

// map global
let map

function getRefugeData(searchRes, callback) {
	const query= {
		per_page: 5,
		query: `${searchRes}`
	}

	$.getJSON(`${refugeAPI_Search}? query= ${searchRes}`, query, callback);
	
	
}



// Rendering results from refuge into html
function renderRes(result){
	console.log(result);
	return`
	<div class= 'resWrap'>
		<li>${result.street}, ${result.city}
			<ul>
				<li>Accessible: ${result.accessible ? 'Yes' : 'No'}</li>
				<li> Unisex: ${result.unisex ? 'Yes' : 'No'}</li>
				<li> Changing Table: ${result.changing_table ? 'Yes' : 'No'}</li>
			</ul>
		</li>
	</div>
`
}


// looping through data from refuge API to render the results and position markers
function showRefugeData(data){
	if (data.length < 1){
		$('.js-results').html('<p class= "error">Hmm, address not recognized. Check spelling or try new address!</p>')
	}
	else {
	const results= data.map((obj) => 
		renderRes(obj));
		renderMarker(obj);
	$('.js-results').html(`<ol>${results}</ol>`);}
 }


	
// event listener to request search data from refugeAPI
function submitTrigger() {
	$('.js-form').submit(event => {
		event.preventDefault();
		const query= $('.js-search').val();
		getRefugeData(query, showRefugeData);
	});
}


// find current user location using navigator.geolocation

function getCoords() {
	navigator.geolocation.getCurrentPosition(function(position) {
		const lat= position.coords.latitude;
		const long= position.coords.longitude;
		initMap(lat, long);
	});
}


// Show markers from refuge data
function renderMarker (item) {
	  new google.maps.Marker({position: {lat: item.latitude, lng: item.longitude}, map: map});
}



// google maps api initMap()

function initMap(lat, long) {

   //Users current location provided by getCoords
	var originalPosition = {lat: +lat, lng: +long};
  //The map, centered at user's postion
	map = new google.maps.Map(
  	document.getElementById('map'), {zoom: 12, center: originalPosition});
   
}



// handler for documents to load
$( document ).ready(function() {
	submitTrigger();
    initMap();
    getCoords();
}) 