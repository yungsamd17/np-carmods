// Search
function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  var ulList = document.querySelectorAll("ul#modList"); // Select all <ul> elements with id="modList"

  ulList.forEach(function (ul) {
    var children = ul.querySelectorAll("li");
    children.forEach(function (child) {
      child.style.display = "none";
    });

    li = ul.querySelectorAll("li");
    li.forEach(function (li) {
      a = li.getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li.style.display = "";
      }
    });
  });

  var otherElements = document.querySelectorAll("h2, h3, a:not([id='searchInput'])");
  otherElements.forEach(function (element) {
    var parentUL = element.closest("ul#modList");
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

  var searchResultsCount = document.querySelectorAll("ul#modList li:not([style='display: none;'])").length;
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
  var liElements = document.querySelectorAll("ul#modList li");
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
window.onload = function () {
  loadSearchResults();
  var input = document.getElementById("searchInput");
  input.addEventListener("keyup", handleKeyUp);
};

// Open links in new tab
function openLinksInNewTab(elementId) {
  const ulElements = document.querySelectorAll(`ul#${elementId}`);
  ulElements.forEach(function (ulElement) {
    const links = ulElement.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (event) {
        event.preventDefault();
        if (links[i].hasAttribute('href') && links[i].getAttribute('href') !== '') {
          window.open(links[i].href, '_blank');
        }
      });
    }
  });
}

// Call the function with the element ID
openLinksInNewTab("modList");


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
  scrollToTop(1000); // Animation Duration (in milliseconds)
}

function scrollToTop(duration) {
  const startingY = window.scrollY;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeInOutCubic = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; // Easing function

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
