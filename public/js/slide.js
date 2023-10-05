let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let ellipses = document.getElementsByClassName("ellipse");
let isProcessing = false; // Flag to prevent multiple clicks
let slideInterval; // Variable to hold the interval

function showSlides() {
    if (isProcessing) return; // Prevent multiple clicks
    isProcessing = true; // Set flag to true

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        ellipses[i].classList.remove("active");
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    ellipses[slideIndex - 1].classList.add("active");

    setTimeout(() => {
        isProcessing = false; // Reset flag
    }, 500); // Reset flag after 500ms
}

// Function to start the automatic slideshow
function startSlideShow() {
    slideInterval = setInterval(showSlides, 5000);
}

// Initial call to start the slideshow
startSlideShow();

// Event listener for ellipses
for (let i = 0; i < ellipses.length; i++) {
    ellipses[i].addEventListener("click", (event) => {
        if (isProcessing) return; // Prevent multiple clicks

        clearInterval(slideInterval); // Clear the existing interval

        let clickIndex = Array.from(ellipses).indexOf(event.target);
        slideIndex = clickIndex; // Update slideIndex

        showSlides(); // Show the slide

        startSlideShow(); // Restart the automatic slideshow
    });
}
