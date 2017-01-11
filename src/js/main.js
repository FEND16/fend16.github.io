/*jshint esversion: 6 */
var TOKEN = 'f7326de422e386e552172886079eede88e9ffa5c';

// AJAX Call for repos
$.ajax({
	method: 'GET',
	url: 'https://api.github.com/orgs/FEND16/repos?sort=pushed&access_token=' + TOKEN,
	dataType: 'JSON',
	success: function(result){
		appendRepos(sortRepos(result));
		$(".repoList").fadeOut(0).fadeIn(500);	
	}});

var orderByDate = function(arr, dateProp) {
  return arr.slice().sort(function (a, b) {
    return a[dateProp] > b[dateProp] ? -1 : 1;
  });
};

//Returns list of repos with the neccesary properties: name, link and push-time
var sortRepos = function(data){
	let repos = [];
	data.map((repo) =>{
		//Convert ISO whatever date string to DateTime-format, usable for sorting later
		let time_updated = new Date(repo.pushed_at);
		//Create object for each repo with the three properties, then push all objects to array
		repos.push({name: repo.name, link: repo.html_url, updated: time_updated});
	});

	//Sort by 'updated' to get latest updated repo first in array
	repos = orderByDate(repos, 'updated');
	return repos;
};


var appendRepos = function(repos){
	let htmlChunk = '';
	repos.map((repo)=>{
		htmlChunk += 	`<ul>
							<li><a href=${repo.link}><span class="keyword">var </span> ${repo.name}</a>;</li>
							<li><span class="string">console</span>.<span class="keyword">log</span>(<span class="string">"Uppdaterad: ${repo.updated.toLocaleString()}"</span>);</li>
						</ul>`;
	});
	$('.repoList').append(htmlChunk);
};

// var appendMembers = function(data){
// 	let htmlChunk = '';
// 	data.map((user) =>{
// 		htmlChunk += `<li><img class='memberImg' src=${user.avatar_url} class='memberImg'/><a href='${user.html_url}'>${user.login}</a>`;
// 	});

// 	$('.memberList').append(htmlChunk);
// };

// AJAX Call for members of organization
// $.ajax({
// 	method: 'GET',
// 	url: 'https://api.github.com/orgs/FEND16/members?access_token=658e516551ef662a2c110c9e51d69c8277fdc1a4',
// 	dataType: 'JSON',
// 	success: function(result){
// 		appendMembers(result);
// 	}});