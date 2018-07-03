const refugeAPI_Search= "https://refugerestrooms.org:443/api/v1/restrooms/search.json"
//let map

function getRefugeData(searchRes, callback) {
	console.log(searchRes)
	const query= {
		per_page: 5,
		query: `${searchRes}`
	}

	$.getJSON(`${refugeAPI_Search}? query= ${searchRes}`, query, callback);
	
	
}

function renderRes(result){
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

function showRefugeData(data){
	console.log(data);
	if (data.length < 1){
		$('.js-results').html('<p class= "error">Hmm, address not recognized. Check spelling or try new address!</p>')
	}
	else {
	const results= data.map((obj) => 
	renderRes(obj));
	$('.js-results').html(`<ol>${results}</ol>`);}
}
	

function submitTrigger() {
	$('.js-form').submit(event => {
		event.preventDefault();
		const query= $('.js-search').val();
		getRefugeData(query, showRefugeData);
	});
}

//const markers= data.map((obj) =>
//	if(data.length > 0){
//	initMap(obj));}


//use loop to create pins. look at line 58 to see how pins/markers work



function initMap() {
   //The location of Uluru
	var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
 	map = new google.maps.Map(
   	document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
}

 initMap()

$(submitTrigger);