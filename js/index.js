const form = document.getElementById('github-form');
const input = document.getElementById('search');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchValue = input.value;
  handleFormSubmission(searchValue);
});

const container = document.getElementById('github-container');
container.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    const username = event.target.getAttribute('data-username');
    handleUserClick(username);
  }
});

container.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    const repoName = event.target.getAttribute('data-repo');
    handleRepoClick(repoName);
  }
});

function handleFormSubmission(searchValue) {
  // TODO: Handle the form submission with the search value
}

function handleUserClick(username) {
  // TODO: Handle the click on the user list item with the username
}

function handleRepoClick(repoName) {
  // TODO: Handle the click on the repo list item with the repo name
}