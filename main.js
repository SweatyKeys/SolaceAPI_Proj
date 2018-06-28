const refugeAPI_Search= "https://refugerestrooms.org:443/api/v1/restrooms/search.json"

function getRefugeData(searchRes, callback) {
	const query= {
		per_page: 5,
		query: `${searchRes}`
	}

	$.getJSON(refugeAPI_Search, query, callback);
}

function renderRes(result){
	return`
	<ul>
		<li>${result.name}
			<ul>
				<li>${result.street}, ${result.city}</li>
				<li>Accessible: ${result.accessible ? 'Yes' : 'No'}, Unisex: ${result.unisex ? 'Yes' : 'No'}, Changing Table: ${result.changing_table ? 'Yes' : 'No'}</li>

			</ul>
		</li>
	</ul>
`
}

function showRefugeData(data){
	console.log(data);
	const results= data.map((obj) => 
	renderRes(obj));
	$('.js-results').html(results)
}
	

function submitTrigger() {
	$('.js-form').submit(event => {
		event.preventDefault();
		const queryTarg= $(event.currentTarget);
		const query= queryTarg.val();
		console.log(query);
		queryTarg.val("");
		getRefugeData(query, showRefugeData);
	});
}

$(submitTrigger);