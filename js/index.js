document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchUsers(searchTerm);
        }
    });

    // search GitHub for user
    function searchUsers(query) {
        const url = `https://api.github.com/search/users?q=${query}`;
        fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => console.error('Error fetching users:', error));
    }



    // display information about the users to the page.
    function displayUsers(users) {
        userList.innerHTML = ''; 
        users.forEach(user => {
            const userItem = document.createElement('li'); 
    
            const userName = document.createElement('p'); 
            userName.textContent = user.login; 
    
            const avatar = document.createElement('img');
            avatar.src = user.avatar_url; 
            avatar.alt = `${user.login}'s Avatar`;
    
            const profileLink = document.createElement('a');
            profileLink.href = user.html_url;
            profileLink.textContent = 'View Profile'; 
    
         
            userItem.appendChild(userName);
            userItem.appendChild(avatar);
            userItem.appendChild(profileLink);
    
            userList.appendChild(userItem);
            
            userItem.addEventListener('click', function(event) {
                event.preventDefault();
                fetchUserRepos(user.login);
            });
        });
    }
    

    // display information about the users to the page.
    function fetchUserRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`;
        fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayUserRepos(data);
        })
        .catch(error => console.error('Error fetching repositories:', error));
    }


    
    // display all the repositories for that user on the page.
    function displayUserRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = repo.full_name;
            repoItem.appendChild(repoLink);
            reposList.appendChild(repoItem);
        });
    }
});
