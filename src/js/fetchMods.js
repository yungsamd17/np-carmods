// Loading Overlay
window.addEventListener("load", function () {
  setTimeout(function () {
    var loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.opacity = 0;
    setTimeout(function () {
      loadingOverlay.style.display = "none";
    }, 250); // Delay to hide the overlay after the opacity transition
  }, 500); // Delay of # second before hiding the overlay
});

// Fetch Mods from the external JSON file
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                displayCarList(data);
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };
    xhr.open('GET', 'carmods.json');
    xhr.send();
});

function displayCarList(categories) {
    const carList = document.getElementById('carList');

    categories.forEach(category => {
        const headerLevel = `h${category.headerLevel}`;
        const categoryHeader = document.createElement(headerLevel);
        categoryHeader.textContent = category.category;
        carList.appendChild(categoryHeader);

        if (category.cars) {
            const carSubList = document.createElement('ul');

            category.cars.forEach(car => {
                const li = document.createElement('li');

                if (car.link) {
                    const linkElement = document.createElement('a');
                    linkElement.href = car.link;
                    linkElement.textContent = car.name || 'Link';
                    li.appendChild(linkElement);
                } else if (car.links && car.links.length > 0) {
                    const delimiter = car.delimiter || ' + ';
                    car.links.forEach((link, index) => {
                        const linkElement = document.createElement('a');
                        linkElement.href = link.url;
                        linkElement.textContent = link.text;
                        li.appendChild(linkElement);

                        if (index < car.links.length - 1) {
                            li.appendChild(document.createTextNode(delimiter));
                        }
                    });
                } else {
                    const linkElement = document.createElement('a');
                    linkElement.textContent = car.name || 'Link';
                    li.appendChild(linkElement);
                }

                carSubList.appendChild(li);
            });

            carList.appendChild(carSubList);
        }
    });
    openCarListLinksInNewTab();
}

// Open carList mod links in new tab
function openCarListLinksInNewTab() {
    const carListElements = document.querySelectorAll('#carList a');
    carListElements.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            if (link.hasAttribute('href') && link.getAttribute('href') !== '') {
                window.open(link.href, '_blank');
            }
        });
    });
}