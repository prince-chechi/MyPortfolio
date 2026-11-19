// DARK AND LIGHT THEME
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☾ Dark Mode";
    } else {
        themeBtn.textContent = "☀ Light Mode";
    }
});


// ACTIVE SIDEBAR NAVIGATION
const navLinks = document.querySelectorAll(".sidebar nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});


// ANIMATED COUNTERS
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 40));

            const updateCounter = () => {
                current += increment;

                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                }
            };

            updateCounter();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));


// SMOOTH SECTION NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(event) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
// Interactive Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        projectCards.forEach(card => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});
// Contact Form Functionality
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactMessage").value;

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const mailtoLink =
            "mailto:prince.chechi00@gmail.com?subject=" +
            emailSubject + "&body=" + emailBody;

        document.getElementById("formStatus").textContent =
            "Opening your email application...";

        window.location.href = mailtoLink;
    });
}
