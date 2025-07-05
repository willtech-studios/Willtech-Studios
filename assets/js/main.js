const mobileNavLinks = document.querySelectorAll(
  ".mobile-menu-container .nav__link"
);

function linkAction() {
  const mobileMenuContainer = document.querySelector(".mobile-menu-container");
  mobileMenuContainer.classList.remove("active");
}

mobileNavLinks.forEach((link) => link.addEventListener("click", linkAction));

const navLink = document.querySelectorAll(".nav__link");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

const mobileNav = document.querySelector("nav.mobile-nav");
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".mobile-menu-container .close-icon");
const mobileMenuContainer = document.querySelector(".mobile-menu-container");
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 60) {
    mobileNav.classList.add("scrolled");
  } else {
    mobileNav.classList.remove("scrolled");
  }
});

menuIcon.addEventListener("click", () => {
  mobileMenuContainer.classList.add("active");
  if (mobileMenuOverlay) mobileMenuOverlay.classList.add("active");
  document.body.classList.add("no-scroll");
});

closeIcon.addEventListener("click", () => {
  mobileMenuContainer.classList.remove("active");
  if (mobileMenuOverlay) mobileMenuOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener("click", () => {
    mobileMenuContainer.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
}

const seeMoreLinks = document.querySelectorAll(".see-more");

seeMoreLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const parentElement = link.parentElement;
    const fullText = parentElement.querySelector(".full-text");

    if (fullText.style.display === "none") {
      fullText.style.display = "block";
      parentElement.style.height = "auto"; // Expand to full height
      link.textContent = "See less";
    } else {
      fullText.style.display = "none";
      parentElement.style.height = "100px"; // Revert to initial height
      link.textContent = "See more";
    }
  });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Message sent successfully!');
        // window.location.href = 'thanks/thanks.html';
      } else {
        alert(data.error || 'Failed to send message.');
      }
    } catch (err) {
      alert('Failed to send message. Please check your connection.');
    }
  });
}

// Work image modal/lightbox functionality
(function() {
  const workImages = document.querySelectorAll('.work__img');
  if (!workImages.length) return;

  // Create modal elements
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.8)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 9999;
  modal.style.visibility = 'hidden';
  modal.style.opacity = 0;
  modal.style.transition = 'opacity 0.15s';
  modal.innerHTML = `
    <div id="work-modal-content" style="position:relative;max-width:90vw;max-height:90vh;">
      <img id="work-modal-img" src="" alt="Work Preview" style="max-width:100%;max-height:80vh;border-radius:8px;box-shadow:0 2px 16px #000;" />
      <button id="work-modal-close" style="position:absolute;top:0;right:0;background:rgba(0,0,0,0.6);color:#fff;border:none;font-size:2rem;padding:0 0.7rem;cursor:pointer;border-radius:0 0.5rem 0 0.5rem;">&times;</button>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('#work-modal-img');
  const closeBtn = modal.querySelector('#work-modal-close');

  function openModal(imgSrc) {
    modalImg.src = imgSrc;
    modal.style.visibility = 'visible';
    modal.style.opacity = 1;
  }
  function closeModal() {
    modal.style.opacity = 0;
    setTimeout(() => {
      modal.style.visibility = 'hidden';
      modalImg.src = '';
    }, 150);
  }

  workImages.forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const img = a.querySelector('img');
      if (img) openModal(img.src);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
})();

// Ensure WhatsApp Contact button works on mobile
(function() {
  var contactBtn = document.querySelector('.home__data .button');
  if (!contactBtn) return;
  contactBtn.addEventListener('click', function(e) {
    var isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    if (isMobile) {
      e.preventDefault();
      window.location.href = 'https://wa.me/message/EFV2PFXAAINFG1';
    }
    // On desktop, default behavior (opens in new tab)
  });
})();
