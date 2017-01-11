'use strict';

/*jshint esversion: 6 */

//AJAX Call for repos
$.ajax({
	method: 'GET',
	url: 'https://api.github.com/orgs/FEND16/repos?sort=pushed',
	dataType: 'JSON',
	success: function success(result) {
		appendRepos(sortRepos(result));
	} });

var orderByDate = function orderByDate(arr, dateProp) {
	return arr.slice().sort(function (a, b) {
		return a[dateProp] > b[dateProp] ? -1 : 1;
	});
};

//Returns list of repos with the neccesary properties: name, link and push-time
var sortRepos = function sortRepos(data) {
	var repos = data.map(function (repo) {
		//Create object for each repo with the three properties, then push all objects to array
		return { name: repo.name, link: repo.html_url, updated: new Date(repo.pushed_at) };
	});

	//Sort by 'updated' to get latest updated repo first in array
	return orderByDate(repos, 'updated');
};

var appendRepos = function appendRepos(repos) {
	var htmlChunk = '';
	repos.map(function (repo) {
		htmlChunk += '<div class="repo-link">\n\t\t\t\t\t\t\t<a href="' + repo.link + '"> ' + repo.name + '</a>\n\t\t\t\t\t\t\t<p>' + repo.updated.toLocaleString() + '</p>\n\t\t\t\t\t\t</div>';
	});
	$('.repos').append(htmlChunk);
};