// GRAB HTML ELEMENTS
const overviewDiv = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
// GLOBAL VARIABLES
const username = "marcelap99";

// console.log(overviewDiv);

// CREATE ASYNC FUNCTION TO FETCH DATA FROM GIT HUB API
const getData = async function(){
  // Fetch request to pull in data
  const fetchRequest = await fetch(`https://api.github.com/users/${username}`);
     // resolve the JSON response
  const jsonData = await fetchRequest.json();
// console.log(jsonData);

displayData(jsonData);
};

getData();


// Create function to display the fetched user information on the page.
const displayData = function(jsonData){
  // Create a new div
  const newDiv = document.createElement("div");
  // give new div class name
 newDiv.classList.add("user-info");
// Create contents of new div
  newDiv.innerHTML = ` <figure>
      <img alt="user avatar" src=${jsonData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${jsonData.name}</p>
      <p><strong>Bio:</strong> ${jsonData.bio}</p>
      <p><strong>Location:</strong> ${jsonData.location}</p>
      <p><strong>Number of public repos:</strong> ${jsonData.public_repos}</p>
    </div> `;
// Insert new div into display div in HTML
    overviewDiv.append(newDiv);

    // call getRepo async function
    getRepos();
};


// create and name a new async function to fetch your repos
const getRepos = async function(){

// fetch request with parameters for sort & 100 per page
  const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=100`);

    // resolve the JSON response
 const jsObj = await repoRequest.json();
// console.log(jsObj);

// call display repo function pass in json response
displayRepos(jsObj);
};


// create and name a function to display information about each repo.
const displayRepos = function(repos){
  // loop through array of objects
  for(const repo of repos){
    // create a li for each repo
    const repoLi = document.createElement("li");
    // give new li class name "repo"
    repoLi.classList.add("repo");
    // insert h3 with placeholder for each repo name
    repoLi.innerHTML = `<h3>${repo.name}</h3>`;
    // add new li to ul already visible in doc body
    repoList.append(repoLi);
  }

};
