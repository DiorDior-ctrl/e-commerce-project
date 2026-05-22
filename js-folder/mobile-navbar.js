const hamburger = document.getElementById("hamburger");
const siteNav = document.getElementById("site-nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    siteNav.classList.toggle("open");
});