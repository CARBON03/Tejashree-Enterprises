const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        toggleNav(nav, navLinks, burger);
    });

    // Add click event listeners to all nav links
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1000) {
                toggleNav(nav, navLinks, burger);
            }
        });
    });
};

const toggleNav = (nav, navLinks, burger) => {
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    burger.classList.toggle('toggle');
};

const shrinkNav = () => {
    const nav = document.querySelector('nav');
    const navContent = document.querySelector('.nav-content');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        // Only apply shrink effect if window width is greater than 1000px
        if (window.innerWidth > 1000) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                nav.classList.add('shrink');
                navContent.style.transform = 'scale(0.9)';
            } else {
                if (scrollTop === 0) {
                    nav.classList.remove('shrink');
                    navContent.style.transform = 'scale(1)';
                }
            }
            lastScrollTop = scrollTop;
        } else {
            // Remove shrink class and reset transform for mobile
            nav.classList.remove('shrink');
            navContent.style.transform = 'scale(1)';
        }
    });

    // Add resize event listener to handle transitions between mobile and desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1000) {
            nav.classList.remove('shrink');
            navContent.style.transform = 'scale(1)';
        }
    });
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

gsap.registerPlugin(ScrollTrigger);

// Animate text and headings within sections
gsap.utils.toArray('section').forEach(section => {
    const textElements = section.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    gsap.from(textElements, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate portfolio items
gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
    const itemContent = item.querySelector('.portfolio-item-content');
    gsap.from(itemContent, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate contact form
const animateContactForm = () => {
    const formElements = document.querySelectorAll('#contact form > *');
    gsap.from(formElements, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
};

// Initialize navigation functions
navSlide();
shrinkNav();

// Initialize contact form animation
animateContactForm();

// to send the mail
 function sendmail() {
            Email.send({
                SecureToken: "6d8e5c86-cfdc-4c32-954b-524c9d0e408f",
                To: 'manojsingh9028@gmail.com',
                From: "mohnishsinghin@gmail.com",
                Subject: "New Contact Form Enquiry!!.",
                Body: "Name: " + document.getElementById("form-name").value
                    + "<br> Email: " + document.getElementById("form-email").value
                    + "<br> PhoneNo: " + document.getElementById("form-address").value
                    + "<br> Message: " + document.getElementById("form-message").value
            }).then(
                message => alert("message Sent Successfully")
            );
        }
