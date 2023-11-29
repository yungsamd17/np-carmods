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

    var headersFromJSON = document.querySelectorAll("#modList h2, #modList h3");
    headersFromJSON.forEach(function(header) {
        header.style.display = "none"; // Hide headers from JSON
    });

    var otherElements = document.querySelectorAll("#modList a:not([id='searchInput'])");
    otherElements.forEach(function(element) {
        element.style.display = "";

        var cardFooter = document.querySelector('.card');
        cardFooter.style.minHeight = '80px';

        var cardFooter = document.querySelector('.card.footer');
        cardFooter.style.borderRadius = '10px';
    });

    var searchResultsCount = document.querySelectorAll("#carList li:not([style='display: none;'])").length;
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

    var otherElements = document.querySelectorAll("#modList h2, #modList h3, #modList a:not([id='searchInput'])");
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