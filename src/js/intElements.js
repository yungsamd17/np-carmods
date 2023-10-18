/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.pastebinButton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Back to the top Button
let mybutton = document.getElementById("topBtn");
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When clicked on the button, scroll to the top with animation
function topFunction() {
    scrollToTop(200); // Animation Duration
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
var modal = document.getElementById("changelogModal");
var btn = document.getElementById("changelogBtn");
var span = document.getElementsByClassName("modalCloseBtn")[0];
btn.onclick = function() {
    modal.style.display = "flex";
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