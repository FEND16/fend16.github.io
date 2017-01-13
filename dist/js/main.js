"use strict";

/*jshint esversion: 6 */
var App = function () {

	var getReposFromAPI = function getReposFromAPI() {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				appendRepos(sortRepos(JSON.parse(req.response)));
			}
		};
		req.open("GET", "https://api.github.com/orgs/FEND16/repos?sort=pushed", true);
		req.send();
	};

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
		var outerDiv = void 0;
		var repoDiv = document.createElement('div');
		repoDiv.classList.add('linklist');
		repoDiv.setAttribute('id', 'repos');

		var htmlChunk = '';
		repos.map(function (repo) {
			htmlChunk += "\n\t\t\t\t<a href=\"" + repo.link + "\"> \n\t\t\t\t" + repo.name + " \n\t\t\t\t</a>\n\t\t\t";
		});
		repoDiv.innerHTML = htmlChunk;
		outerDiv = document.getElementById('repos');
		outerDiv.appendChild(repoDiv);
	};

	return {
		getRepos: getReposFromAPI
	};
}();

App.getRepos();