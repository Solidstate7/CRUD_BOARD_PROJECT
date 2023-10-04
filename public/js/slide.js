let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let ellipses = document.getElementsByClassName("ellipse");

    console.log(`slide :`, slides);
    console.log(`eli :`, ellipses);

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        ellipses[i].classList.remove("active");
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.left = "0";
    slides[slideIndex - 1].style.display = "block";
    ellipses[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 5000);
}

showSlides();
