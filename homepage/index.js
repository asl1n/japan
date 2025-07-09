// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  icon.classList.toggle("fa-bars")
  icon.classList.toggle("fa-times")
})

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.add("fa-bars")
    icon.classList.remove("fa-times")
  })
})

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
document.querySelectorAll(".service-card, .story-card, .reason-card, .stat-item").forEach((el) => {
  observer.observe(el)
})

// Counter animation for statistics
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
    const suffix = counter.textContent.replace(/[0-9]/g, "")
    let current = 0
    const increment = target / 50

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.floor(current) + suffix
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target + suffix
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when statistics section is visible
const statsSection = document.querySelector(".cta-statistics-section")
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (statsSection) {
  statsObserver.observe(statsSection)
}

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

// Card slider functionality for reasons section
document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  if (cardsContainer && prevBtn && nextBtn) {
    let currentIndex = 0
    const cards = cardsContainer.querySelectorAll(".reason-card")
    const totalCards = cards.length
    const cardWidth = 300

    function updateSlider() {
      const translateX = -currentIndex * cardWidth
      cardsContainer.style.transform = `translateX(${translateX}px)`

      cards.forEach((card, index) => {
        if (index === currentIndex) {
          card.classList.remove("translucent")
        } else {
          card.classList.add("translucent")
        }
      })

      prevBtn.disabled = currentIndex === 0
      nextBtn.disabled = currentIndex >= totalCards - 1
    }

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--
        updateSlider()
      }
    })

    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalCards - 1) {
        currentIndex++
        updateSlider()
      }
    })

    updateSlider()

    setInterval(() => {
      if (currentIndex < totalCards - 1) {
        currentIndex++
      } else {
        currentIndex = 0
      }
      updateSlider()
    }, 5000)
  }
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

// Hero Background Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const heroSlides = document.querySelectorAll(".hero-slide")
  const heroDots = document.querySelectorAll(".hero-dot")

  let currentHeroSlide = 0
  const totalHeroSlides = heroSlides.length

  function showHeroSlide(index) {
    heroSlides.forEach((slide) => slide.classList.remove("active"))
    heroDots.forEach((dot) => dot.classList.remove("active"))

    heroSlides[index].classList.add("active")
    heroDots[index].classList.add("active")

    currentHeroSlide = index
  }

  function nextHeroSlide() {
    const nextIndex = (currentHeroSlide + 1) % totalHeroSlides
    showHeroSlide(nextIndex)
  }

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroSlide(index)
    })
  })

  let heroAutoSlide = setInterval(nextHeroSlide, 3000)

  const heroSection = document.querySelector(".hero")
  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => {
      clearInterval(heroAutoSlide)
    })

    heroSection.addEventListener("mouseleave", () => {
      heroAutoSlide = setInterval(nextHeroSlide, 3000)
    })
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navMenu.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.classList.add("fa-bars")
      icon.classList.remove("fa-times")
    }
  })

  let heroTouchStartX = 0
  let heroTouchEndX = 0

  if (heroSection) {
    heroSection.addEventListener("touchstart", (e) => {
      heroTouchStartX = e.changedTouches[0].screenX
    })

    heroSection.addEventListener("touchend", (e) => {
      heroTouchEndX = e.changedTouches[0].screenX
      handleHeroSwipe()
    })
  }

  function handleHeroSwipe() {
    const swipeThreshold = 50
    const diff = heroTouchStartX - heroTouchEndX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextHeroSlide()
      } else {
        const prevIndex = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides
        showHeroSlide(prevIndex)
      }
    }
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")

  if (hero && window.innerWidth > 768) {
    // Apply parallax transform but keep hero behind other sections
    hero.style.transform = `translateY(${scrolled * 0.5}px)`

    // Ensure hero stays behind other sections
    if (scrolled > 50) {
      hero.style.zIndex = "1"
    } else {
      hero.style.zIndex = "1"
    }
  }
})
