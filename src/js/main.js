/*jshint esversion: 6 */
const App = (function(){

	const getReposFromAPI = () => {
		let req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				appendRepos(sortRepos(JSON.parse(req.response)));
			}
		};
		req.open("GET", "https://api.github.com/orgs/FEND16/repos?sort=pushed", true);
		req.send();
	};

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
		let outerDiv;
		let repoDiv = document.createElement('div');
		repoDiv.classList.add('linklist');
		repoDiv.setAttribute('id', 'repos');

		let htmlChunk = '';
		repos.map((repo) => {
			htmlChunk += `
				<a href="${repo.link}"> 
				${repo.name} 
				</a>
			`;
		});
		repoDiv.innerHTML = htmlChunk;	
		outerDiv = document.getElementById('repos');
		outerDiv.appendChild(repoDiv);
	};

	return {
		getRepos: getReposFromAPI
	};
})();


App.getRepos();