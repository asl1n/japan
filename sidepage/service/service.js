// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  icon.classList.toggle("fa-bars")
  icon.classList.toggle("fa-times")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.add("fa-bars")
    icon.classList.remove("fa-times")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-item, .story-card").forEach((el) => {
  observer.observe(el)
})

// Success Stories slider functionality
document.addEventListener("DOMContentLoaded", () => {
  const storiesSlider = document.getElementById("storiesSlider")
  const storiesPrevBtn = document.getElementById("storiesPrevBtn")
  const storiesNextBtn = document.getElementById("storiesNextBtn")

  if (storiesSlider && storiesPrevBtn && storiesNextBtn) {
    let currentStoryIndex = 0
    const storyCards = storiesSlider.querySelectorAll(".story-card")
    const totalStoryCards = storyCards.length

    function getCardsToShow() {
      if (window.innerWidth <= 768) return 1
      if (window.innerWidth <= 1024) return 2
      return 3
    }

    function getMaxIndex() {
      const cardsToShow = getCardsToShow()
      return Math.max(0, totalStoryCards - cardsToShow)
    }

    function updateStoriesSlider() {
      const cardsToShow = getCardsToShow()
      const cardWidth = 100 / cardsToShow
      const translateX = -currentStoryIndex * cardWidth
      storiesSlider.style.transform = `translateX(${translateX}%)`

      storyCards.forEach((card, index) => {
        if (index >= currentStoryIndex && index < currentStoryIndex + cardsToShow) {
          card.classList.remove("translucent")
        } else {
          card.classList.add("translucent")
        }
      })

      const maxIndex = getMaxIndex()
      storiesPrevBtn.disabled = currentStoryIndex === 0
      storiesNextBtn.disabled = currentStoryIndex >= maxIndex
    }

    storiesPrevBtn.addEventListener("click", () => {
      if (currentStoryIndex > 0) {
        currentStoryIndex--
        updateStoriesSlider()
      }
    })

    storiesNextBtn.addEventListener("click", () => {
      const maxIndex = getMaxIndex()
      if (currentStoryIndex < maxIndex) {
        currentStoryIndex++
        updateStoriesSlider()
      }
    })

    window.addEventListener("resize", () => {
      const maxIndex = getMaxIndex()
      if (currentStoryIndex > maxIndex) {
        currentStoryIndex = maxIndex
      }
      updateStoriesSlider()
    })

    updateStoriesSlider()

    setInterval(() => {
      const maxIndex = getMaxIndex()
      if (currentStoryIndex < maxIndex) {
        currentStoryIndex++
      } else {
        currentStoryIndex = 0
      }
      updateStoriesSlider()
    }, 6000)
  }
})

// Form handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const submitBtn = contactForm.querySelector(".submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Submitting..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Thank you for your inquiry! We will contact you soon.")
      contactForm.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Back to top button
const createBackToTopButton = () => {
  const button = document.createElement("button")
  button.innerHTML = '<i class="fas fa-arrow-up"></i>'
  button.className = "back-to-top"
  button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `

  document.body.appendChild(button)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      button.style.opacity = "1"
      button.style.visibility = "visible"
    } else {
      button.style.opacity = "0"
      button.style.visibility = "hidden"
    }
  })

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

createBackToTopButton()

// CTA button click handler
document.querySelector(".cta-btn")?.addEventListener("click", () => {
  const contactSection = document.querySelector("#contact")
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" })
  }
})

// Contact button click handler
document.querySelector(".contact-btn")?.addEventListener("click", () => {
  const contactSection = document.querySelector("#contact")
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" })
  }
})
