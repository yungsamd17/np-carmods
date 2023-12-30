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
    xhr.open('GET', 'src/json/carmods.json');
    xhr.send();
});

function displayCarList(categories) {
    const carList = document.getElementById('carList');

    categories.forEach((category) => {
        const headerLevel = `h${category.headerLevel}`;
        const categoryHeader = document.createElement(headerLevel);

        if (category.headerLink) {
            const linkElement = document.createElement("a");
            linkElement.href = category.headerLink.url;
            linkElement.textContent = category.category;

            // Check if openInNewTab is true for header link
            if (category.headerLink.openInNewTab) {
                linkElement.target = "_blank"; // Open link in a new tab
            }

            // Add specified style class if present
            if (category.headerLink.linkClass) {
                linkElement.classList.add(category.headerLink.linkClass);
            }

            categoryHeader.appendChild(linkElement);
        } else {
            categoryHeader.textContent = category.category;
        }

        carList.appendChild(categoryHeader);

        if (category.cars) {
            const carSubList = document.createElement("ul");

            category.cars.forEach((car) => {
                const li = document.createElement("li");

                if (car.link) {
                    const linkElement = document.createElement("a");
                    linkElement.href = car.link;
                    linkElement.textContent = car.name || "Link";

                    // Add specified style class if present
                    if (car.linkClass) {
                        linkElement.classList.add(car.linkClass);
                    }

                    li.appendChild(linkElement);
                } else if (car.links && car.links.length > 0) {
                    const delimiter = car.delimiter || " + ";
                    car.links.forEach((link, index) => {
                        const linkElement = document.createElement("a");
                        linkElement.href = link.url;
                        linkElement.textContent = link.text;

                        // Add specified style class if present
                        if (link.linkClass) {
                            linkElement.classList.add(link.linkClass);
                        }

                        li.appendChild(linkElement);

                        if (index < car.links.length - 1) {
                            li.appendChild(document.createTextNode(delimiter));
                        }
                    });
                } else {
                    const linkElement = document.createElement("a");
                    linkElement.textContent = car.name || "Link";

                    // Add specified style class if present
                    if (car.linkClass) {
                        linkElement.classList.add(car.linkClass);
                    }

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