// Loading Overlay
window.addEventListener("load", function () {
  setTimeout(function () {
    var loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.opacity = 0;
    setTimeout(function () {
      loadingOverlay.style.display = "none";
    }, 200); // Delay to hide the overlay after the opacity transition
  }, 400); // Delay of # second before hiding the overlay
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

// Search
function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    var ulList = document.querySelectorAll("ul#carList"); // Select all <ul> elements with id="carList"

    ulList.forEach(function (ul) {
        var children = ul.querySelectorAll("li");
        children.forEach(function (child) {
            child.style.display = "none";
        });

        var categoryHeader = ul.previousElementSibling; // Get the preceding category header
        var matchesFound = false;

        li = ul.querySelectorAll("li");
        li.forEach(function (li) {
            a = li.getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li.style.display = "";
                matchesFound = true;
            }
        });

        if (matchesFound) {
            if (categoryHeader) {
                categoryHeader.style.display = ""; // Show the header if matches are found
            }
        } else {
            if (categoryHeader) {
                categoryHeader.style.display = "none"; // Hide the header if no matches are found
            }
        }
    });

    var headersFromJSON = document.querySelectorAll("h2, h3");
    headersFromJSON.forEach(function (header) {
        header.style.display = "none"; // Hide headers from JSON
    });

    var otherElements = document.querySelectorAll("a:not([id='searchInput'])");
    otherElements.forEach(function (element) {
        var parentUL = element.closest("ul#carList");
        var isExcluded = false;

        // Check if element is excluded from hiding
        if (element.tagName === "A") {
            var ancestorH1 = element.closest("h1");
            var ancestorHeader = element.closest("header");
            var ancestorP = element.closest("p");

            if (ancestorH1 || ancestorHeader || (ancestorP && ancestorP.contains(element))) {
                isExcluded = true;
            }
        }

        // Exclude elements in the footer div class
        if (element.closest(".footer")) {
            isExcluded = true;
        }
        if (element.closest(".modal-header")) {
            isExcluded = true;
        }
        if (element.closest(".onxLink")) {
            isExcluded = true;
        }

        if (!parentUL && !isExcluded) {
            element.style.display = "none";
        } else {
            element.style.display = "";
        }
    });

    var searchResultsCount = document.querySelectorAll("ul#carList li:not([style='display: none;'])").length;
    var messageElement = document.getElementById("searchResultsMessage");
    messageElement.textContent = "Found " + searchResultsCount + " matching search result(s).";
}

function handleKeyUp() {
    var input = document.getElementById("searchInput");
    var filter = input.value.trim().toUpperCase();

    if (filter.length >= 2) {
        myFunction(); // Trigger search as you type
    } else {
        clearSearchResults(); // Clear search results
    }
}

function clearSearchInput() {
    var input = document.getElementById("searchInput");
    input.value = "";
    clearSearchResults(); // Clear search results
}

function clearSearchResults() {
    var liElements = document.querySelectorAll("ul#carList li");
    liElements.forEach(function (li) {
        li.style.display = "";
    });

    var otherElements = document.querySelectorAll("h2, h3, a:not([id='searchInput'])");
    otherElements.forEach(function (element) {
        element.style.display = "";
    });

    var messageElement = document.getElementById("searchResultsMessage");
    messageElement.textContent = "";
}


function loadSearchResults() {
    var urlParams = new URLSearchParams(window.location.search);
    var searchQuery = urlParams.get("search");
    if (searchQuery) {
        var input = document.getElementById("searchInput");
        input.value = decodeURIComponent(searchQuery);
        myFunction(); // Trigger search
    }
}

// Call loadSearchResults on page load
window.onload = function() {
    loadSearchResults();
    var input = document.getElementById("searchInput");
    input.addEventListener("keyup", handleKeyUp);
};

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

// Back to the top Button
let mybutton = document.getElementById("topBtn");
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When clicked on the button, scroll to the top with animation
function topFunction() {
    scrollToTop(500); // Animation Duration
}

function scrollToTop(duration) {
    const startingY = window.scrollY;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // Easing function

        window.scrollTo(0, startingY * (1 - easeInOutCubic(progress)));

        if (progress < 1) {
            window.requestAnimationFrame(animateScroll);
        }
    }

    window.requestAnimationFrame(animateScroll);
}


// Updates Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("updatesBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
// When clicked anywhere outside, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}