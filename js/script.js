// GRAB HTML ELEMENTS /  SET GLOBAL VARIABLES
// 1 - div where profile info will appear
const overviewDiv = document.querySelector(".overview");
// 2 - ul where repo list will appear
const repoList = document.querySelector(".repo-list");
// 3 - section class repos (list of repos)
const repoListSec = document.querySelector(".repos");
// 4 - section class repo-data (indv repo data)
const indRepoData = document.querySelector(".repo-data");
// 5 - select button - back to repo
const backButton = document.querySelector(".back-button");
// 6 - select input - w/ placeholder: search by name
const filterInput = document.querySelector(".filter-repos");

// GLOBAL VARIABLES CONTINUED
const username = "marcelap99";


// CREATE ASYNC FUNCTION TO FETCH DATA FROM GITHUB API
const getData = async function(){
  // Fetch request to pull in data
  const fetchRequest = await fetch(`https://api.github.com/users/${username}`);
     // resolve the JSON response
  const jsonData = await fetchRequest.json();

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

// call display repo function pass in json response (array of objs)
displayRepos(jsObj);
};


// create and name a function to display information about each repo.
const displayRepos = function(repos){
  filterInput.classList.remove("hide");
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

// Create event listner "click" for repoList UL
repoList.addEventListener("click",function(e){
  if(e.target.matches("h3")){
    let repoName = e.target.innerText;
    // console.log(repoName);
    getEachRepo(repoName);
  }

});

// CREATE ASYNC FUNCTION TO FETCH SPECIFIC REPO DATA & LANGUAGES FROM GITHUB API REPOS - 2 FETCH REQUESTS IN 1 ASYNC FUNCTION
const getEachRepo = async function(repoName){
  // Fetch request to pull in data indv repo
  const fetchEachRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
     // resolve the JSON response
  const repoInfo = await fetchEachRepo.json();

// Fetch request specifically for laguanges url
  const fetchLanguages = await fetch(repoInfo.languages_url);
   // resolve the JSON response - Object
  const languageData = await fetchLanguages.json();
  // console.log(languageData)
  // Create emtpy array to insert languages
  const languageArray = [];
  // Loop through object, create array
  for(const language in languageData){
    languageArray.push(language);
  }
// console.log(languageArray)
// CAll displaySpecificRepo pass in repoInfo & languageArray
displaySpecificRepo(repoInfo,languageArray);
};

// Create a function to display the individual repo info - parameters repoInfo & languageArray
const displaySpecificRepo = function(repoInfo,languageArray){
  // empty ".repo-data" section
  indRepoData.innerHTML = "";
  // remove hide - class from ".repo-data" section
  indRepoData.classList.remove("hide");
  // add hide class to section .repos
  repoListSec.classList.add("hide");
  // remove the hide class from back button
  backButton.classList.remove("hide");

  // Create a new div element
  const repoDiv = document.createElement("div");
  // Insert contents into new div using placeholders
  repoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languageArray.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  // append new div into  (indRepoData-.repo-data) section
  indRepoData.append(repoDiv);
};


// Add event listener to back button - hide ind repo, hide button, show list of repos
backButton.addEventListener("click",function(){
  repoListSec.classList.remove("hide");
  indRepoData.classList.add("hide");
  backButton.classList.add("hide");
});

// Add event listener to input field
filterInput.addEventListener("input",function(e){
  // grab text being entered by user
  const searchValue = e.target.value;
  // Lowercase the contents of searchValue
  const valueLowerCased = searchValue.toLowerCase();
  // grab all html doc elements with ".repo" (created when repo list is generated) creates an Object
  const repos = document.querySelectorAll(".repo");

  // Loop through repos object, grab each indv repo
  for (const repo of repos){
    // Lowercase each repos text
    const repoLowerCase = repo.innerText.toLowerCase();
    // conditional statement: if input search text is included in repo list
    if(repoLowerCase.includes(valueLowerCased)){
      // Show specific repos in the list if text matches
      repo.classList.remove("hide");
    }else{
      // Hide all repos that don't include matched in text
      repo.classList.add("hide");
    }
  }
});
