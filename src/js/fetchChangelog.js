// Fetch Changelog from the external JSON file
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                displayChangelog(data);
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };
    xhr.open('GET', 'src/json/changelog.json');
    xhr.send();
});

function displayChangelog(changelog) {
    const modalBody = document.querySelector('.modalBody');

    changelog.forEach(entry => {
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = entry.date;
        modalBody.appendChild(dateParagraph);

        const changeList = document.createElement('ul');
        entry.changelog.forEach(change => {
            const changeItem = document.createElement('li');
            changeItem.textContent = change.change;
            changeList.appendChild(changeItem);
        });

        modalBody.appendChild(changeList);
    });

    // Add link to the repository commits
    const commitsLink = document.createElement('p');
    commitsLink.innerHTML = 'Check <a href="https://github.com/your/repository/commits" >repository commits</a> for more.';
    modalBody.appendChild(commitsLink);
}
