// Define the API endpoints
const userSearchApiUrl = 'https://api.github.com/search/users?q=';
const userReposApiUrl = 'https://api.github.com/users/';

// Get the form element and add a submit event listener
const form = document.getElementById('github-form');
form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent the form from submitting

  // Get the search input value
  const searchInput = document.getElementById('search').value;

  // Use fetch to get the user search results from the GitHub API
  fetch(userSearchApiUrl + searchInput + '&per_page=5') // limit to 5 results for demo purposes
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('An error occurred while fetching user search results.');
      }
    })
    .then(data => {
      // Get the user list element and clear any existing content
      const userList = document.getElementById('user-list');
      userList.innerHTML = '';

      // Loop through the search results and create a list item element for each user
      data.items.forEach(user => {
        // Create an anchor element for the user's profile link
        const profileLink = document.createElement('a');
        profileLink.href = user.html_url;
        profileLink.textContent = user.login;

        // Create an image element for the user's avatar
        const avatar = document.createElement('img');
        avatar.src = user.avatar_url;

        // Create a list item element for the user and append the profile link and avatar to it
        const userListItem = document.createElement('li');
        userListItem.appendChild(profileLink);
        userListItem.appendChild(avatar);

        // Add a click event listener to the user list item to fetch the user's repositories
        userListItem.addEventListener('click', function() {
          // Use fetch to get the user's repositories from the GitHub API
          fetch(userReposApiUrl + user.login + '/repos')
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('An error occurred while fetching user repositories.');
              }
            })
            .then(data => {
              // Get the repos list element and clear any existing content
              const reposList = document.getElementById('repos-list');
              reposList.innerHTML = '';

              // Loop through the repositories and create a list item element for each one
              data.forEach(repo => {
                // Create an anchor element for the repository's link
                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;

                // Create a list item element for the repository and append the link to it
                const repoListItem = document.createElement('li');
                repoListItem.appendChild(repoLink);

                // Add the repository list item to the repos list element
                reposList.appendChild(repoListItem);
              });
            })
            .catch(error => {
              console.error(error);
              alert(error.message);
            });
        });

        // Add the user list item to the user list element
        userList.appendChild(userListItem);
      });
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
});