window.addEventListener('scroll', () => document.getElementById('headerSolid').classList.toggle('show', window.pageYOffset > 0));

const [hamburger, navMenu] = [document.querySelector(".hamburger"), document.querySelector(".nav-menu")];
hamburger.addEventListener("click", () => [hamburger, navMenu].forEach(el => el.classList.toggle("active")));
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => [hamburger, navMenu].forEach(el => el.classList.remove("active"))));