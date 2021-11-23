// GRAB HTML ELEMENTS
const overviewDiv = document.querySelector(".overview");

// GLOBAL VARIABLES
const username = "marcelap99";

console.log(overviewDiv);

// CREATE ASYNC FUNCTION TO FETCH DATA FROM GIT HUB API
const getData = async function(){
  // Fetch request to pull in data
  const fetchRequest = await fetch(`https://api.github.com/users/${username}`);
     // resolve the JSON response
  const jsonData = await fetchRequest.json();
console.log(jsonData);

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

};
