// Search
function searchMods() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    var ulList = document.querySelectorAll("ul#carList"); // Select all <ul> elements with id="carList"

    ulList.forEach(function(ul) {
        var children = ul.querySelectorAll("li");
        children.forEach(function(child) {
            child.style.display = "none";
        });

        var categoryHeader = ul.previousElementSibling; // Get the preceding category header
        var matchesFound = false;

        li = ul.querySelectorAll("li");
        li.forEach(function(li) {
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
    headersFromJSON.forEach(function(header) {
        header.style.display = "none"; // Hide headers from JSON
    });

    var otherElements = document.querySelectorAll("a:not([id='searchInput'])");
    otherElements.forEach(function(element) {
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
        if (element.closest(".cardLinks")) {
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
        searchMods(); // Trigger search as you type
    } else {
        clearSearchResults(); // Clear search results
    }
}

function clearSearchResults() {
    var liElements = document.querySelectorAll("ul#carList li");
    liElements.forEach(function(li) {
        li.style.display = "";
    });

    var otherElements = document.querySelectorAll("h2, h3, a:not([id='searchInput'])");
    otherElements.forEach(function(element) {
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
        searchMods(); // Trigger search
    }
}

// Call loadSearchResults on page load
window.onload = function() {
    loadSearchResults();
    var input = document.getElementById("searchInput");
    input.addEventListener("keyup", handleKeyUp);
};