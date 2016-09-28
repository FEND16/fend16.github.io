/*jshint esversion: 6 */
$.ajax({
	method: 'GET',
	url: 'https://api.github.com/orgs/FEND16/members?access_token=658e516551ef662a2c110c9e51d69c8277fdc1a4',
	dataType: 'JSON',
	success: function(result){
		console.log(result);
}});


var appendThisShit = function(data){
	var htmlChunk = '';
	data.map((element) =>{
		htmlChunk += `<a href='${element.url}'><img src='${element.avatar_url}'`;
	})

	$('.memberList').append(htmlChunk);
}


