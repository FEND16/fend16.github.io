/*jshint esversion: 6 */

//AJAX Call for repos
$.ajax({
	method: 'GET',
	url: 'https://api.github.com/orgs/FEND16/repos?sort=pushed',
	dataType: 'JSON',
	success: (result) => {
		appendRepos(sortRepos(result));
	}});

const orderByDate = (arr, dateProp) => {
  return arr.slice().sort((a, b) => {
    return a[dateProp] > b[dateProp] ? -1 : 1;
  });
};

//Returns list of repos with the neccesary properties: name, link and push-time
const sortRepos = (data) => {
	let repos = data.map((repo) => {
		//Create object for each repo with the three properties, then push all objects to array
		return {name: repo.name, link: repo.html_url, updated: new Date(repo.pushed_at)};
	});

	//Sort by 'updated' to get latest updated repo first in array
	return orderByDate(repos, 'updated');
};

const appendRepos = (repos) => {
	let htmlChunk = '';
	repos.map((repo) => {
		htmlChunk += 	`<div class="repo-link">
							<a href="${repo.link}"> ${repo.name}</a>
							<p>${repo.updated.toLocaleString()}</p>
						</div>`;
	});
	$('.repos').append(htmlChunk);
};