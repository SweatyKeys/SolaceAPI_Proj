const refugeAPI_Search= "https://refugerestrooms.org:443/api/v1/restrooms/search.json"

function getRefugeData(searchRes, callback{
	const query= {
		per_page: 5,
		query: `${searchRes}`
	}

	$.getJSON(refugeAPI_Search, query, callback);
}

function showRefugeData(data){
	console.log(data);
}
	

function submitTrigger() {
	$('.js-form').submit(event => {
		event.eventDefault();
		const query= queryTarg.val();
		console.log(query);
		queryTarg.val("");
		getRefugeData(query, showRefugeData);
	});
}

$(submitTrigger);