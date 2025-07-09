//handled by dom 



//data for blog
const blogPosts = [
  {
    id: 1,
    title: "Nepal Back in the Game: Australia Elevates Visa Status to Level 2 After 7 Long Years",
    excerpt:
      "Breaking news! Australia has finally elevated Nepal's visa status to Level 2 after 7 years. This means easier visa processing for Nepali students and professionals. Read more about what this means for your study abroad plans.",
    image: "assets/blog1.png",
    date: "Dec 15, 2024",
    category: "Visa",
  },
  {
    id: 2,
    title: "A Comprehensive Guide to Convert GPA to Percentage for Japan University Applications",
    excerpt:
      "Converting your GPA to percentage for Japanese university applications can be confusing. This comprehensive guide breaks down the conversion process, explains different grading systems, and provides accurate conversion formulas.",
    image: "assets/blog2.png",
    date: "Dec 12, 2024",
    category: "Education Services",
  },
  {
    id: 3,
    title: "Understanding the Japanese Grading System: GPA, Letter Grades, and What They Mean",
    excerpt:
      "Japan's academic grading differs from Western grading systems. Most universities use a 4-point scale, but understanding the nuances is crucial for international students. Learn about GPA scales and how they impact your academic journey.",
    image: "assets/blog3.png",
    date: "Dec 10, 2024",
    category: "Study Japan",
  },
  {
    id: 4,
    title: "How to Apply for a Japanese Student Visa: A Step-by-Step Guide",
    excerpt:
      "Applying for a Japanese student visa can seem overwhelming, but with proper guidance, it's straightforward. This step-by-step guide covers all requirements, documents needed, and tips for a successful application.",
    image: "assets/blog4.png",
    date: "Dec 8, 2024",
    category: "Visa",
  },
  {
    id: 5,
    title: "Top 10 Japanese Universities for International Students in 2025",
    excerpt:
      "Discover the best Japanese universities welcoming international students. From Tokyo University to Kyoto University, explore programs, admission requirements, and what makes each institution unique for foreign students.",
    image: "assets/blog1.png",
    date: "Dec 5, 2024",
    category: "Education Services",
  },
  {
    id: 6,
    title: "JLPT Preparation Guide: Tips to Pass the Japanese Language Proficiency Test",
    excerpt:
      "The Japanese Language Proficiency Test (JLPT) is essential for studying in Japan. Get expert tips on preparation strategies, study materials, and test-taking techniques to achieve your desired level.",
    image: "assets/blog2.png",
    date: "Dec 3, 2024",
    category: "Study Japan",
  },
  {
    id: 7,
    title: "Scholarship Opportunities for Nepali Students in Japan 2025",
    excerpt:
      "Explore various scholarship programs available for Nepali students planning to study in Japan. From MEXT scholarships to university-specific grants, find funding opportunities that match your academic goals.",
    image: "assets/blog4.png",
    date: "Nov 30, 2024",
    category: "Education Services",
  },
  {
    id: 8,
    title: "Living in Japan as an International Student: A Complete Guide",
    excerpt:
      "Life in Japan offers unique experiences for international students. Learn about accommodation options, daily expenses, cultural etiquette, and practical tips for adapting to Japanese society.",
    image: "assets/blog3.png",
    date: "Nov 28, 2024",
    category: "Student Life",
  },
  {
    id: 9,
    title: "Part-time Work Opportunities for International Students in Japan",
    excerpt:
      "International students in Japan can work part-time with proper permits. Discover legal work options, application processes, popular job types, and how to balance work with studies effectively.",
    image: "assets/blog2.png",
    date: "Nov 25, 2024",
    category: "Student Life",
  },
  {
    id: 10,
    title: "Japanese University Application Timeline: When and How to Apply",
    excerpt:
      "Timing is crucial for Japanese university applications. Understand the academic calendar, application deadlines, required documents, and create a timeline that ensures you don't miss important dates.",
    image: "assets/blog1.png",
    date: "Nov 22, 2024",
    category: "Education Services",
  },
  
  {
    id: 11,
    title: "Student Visa Extension Process in Japan: Complete Guide",
    excerpt:
      "Learn how to extend your student visa in Japan, required documents, application timeline, and common mistakes to avoid during the extension process.",
    image: "assets/blog2.png",
    date: "Nov 20, 2024",
    category: "Visa",
  },
  {
    id: 12,
    title: "International Student Support Services at Japanese Universities",
    excerpt:
      "Discover the comprehensive support services available for international students at Japanese universities, from academic assistance to cultural integration programs.",
    image: "assets/blog3.png",
    date: "Nov 18, 2024",
    category: "International Student",
  },
  {
    id: 13,
    title: "Cultural Adaptation Tips for Students Moving to Japan",
    excerpt:
      "Essential cultural adaptation strategies for international students in Japan. Learn about social etiquette, communication styles, and how to build meaningful relationships.",
    image: "assets/blog4.png",
    date: "Nov 15, 2024",
    category: "Study Japan",
  },
  {
    id: 14,
    title: "Campus Life and Extracurricular Activities in Japanese Universities",
    excerpt:
      "Explore the vibrant campus life at Japanese universities. From clubs and societies to festivals and sports, discover how to make the most of your student experience.",
    image: "assets/blog2.png",
    date: "Nov 12, 2024",
    category: "Student Life",
  },
  {
    id: 15,
    title: "Working Holiday Visa vs Student Visa: Which is Right for You?",
    excerpt:
      "Compare working holiday visa and student visa options for Japan. Understand the differences, benefits, and limitations of each visa type to make an informed decision.",
    image: "assets/blog4.png",
    date: "Nov 10, 2024",
    category: "Visa",
  },
]

// Pagination variables
let currentPage = 1
const postsPerPage = 3
let filteredPosts = [...blogPosts] 
let currentCategory = "All" 

// Function to get posts by category
function getPostsByCategory(category) {
  if (category === "All") {
    return blogPosts
  }
  return blogPosts.filter((post) => post.category === category)
}

// Function to update category counts
function updateCategoryCounts() {
  const categories = {
    "Education Services": blogPosts.filter((post) => post.category === "Education Services").length,
    "International Student": blogPosts.filter((post) => post.category === "International Student").length,
    Visa: blogPosts.filter((post) => post.category === "Visa").length,
    "Study Japan": blogPosts.filter((post) => post.category === "Study Japan").length,
    "Student Life": blogPosts.filter((post) => post.category === "Student Life").length,
  }

  // Update the counts in the sidebar
  const categoryLinks = document.querySelectorAll(".category-list a")
  categoryLinks.forEach((link) => {
    const categoryText = link.querySelector("span").previousSibling.textContent.trim()
    if (categories[categoryText]) {
      link.querySelector("span").textContent = categories[categoryText]
    }
  })
}

// Function to render blog posts with current filter
function renderBlogPosts() {
  const totalFilteredPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Reset to page 1 
  if (currentPage > totalFilteredPages) {
    currentPage = 1
  }

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Show message if no posts found
  if (currentPosts.length === 0) {
    blogContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <h3>No posts found</h3>
        <p>No blog posts found for the selected category.</p>
        <button onclick="filterByCategory('All')" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Show All Posts</button>
      </div>
    `
    updatePagination(0)
    return
  }

  blogContainer.innerHTML = currentPosts
    .map(
      (post) => `
    <article class="blog-post">
      <div class="blog-image">
        <img src="${post.image}" alt="${post.title}">
        <span class="blog-date">${post.date}</span>
      </div>
      <div class="blog-content">
        <h2>${post.title}</h2>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <a href="#" class="read-more">Read More →</a>
          <span class="blog-category" style="background: var(--secondary-color); color: var(--text-primary); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 500;">${post.category}</span>
        </div>
      </div>
    </article>
  `,
    )
    .join("")

  // Update pagination
  updatePagination(totalFilteredPages)
}

// Function to update pagination
function updatePagination(totalPages) {
  if (totalPages === 0) {
    pageInfo.textContent = "0"
    prevBtn.disabled = true
    nextBtn.disabled = true
    return
  }

  pageInfo.textContent = `${currentPage} of ${totalPages}`
  prevBtn.disabled = currentPage === 1
  nextBtn.disabled = currentPage === totalPages
}

// Function to filter posts by category
function filterByCategory(category) {
  currentCategory = category
  currentPage = 1 // Reset to first page
  filteredPosts = getPostsByCategory(category)

  // Update active category styling
  document.querySelectorAll(".category-list a").forEach((link) => {
    link.classList.remove("active-category")
  })

  // Add active class to clicked category
  if (category !== "All") {
    const categoryLinks = document.querySelectorAll(".category-list a")
    categoryLinks.forEach((link) => {
      const linkText = link.textContent.trim().split(" ")[0] + " " + link.textContent.trim().split(" ")[1]
      if (linkText === category) {
        link.classList.add("active-category")
      }
    })
  }

  // Update the blog posts display
  renderBlogPosts()

  // Scroll to blog section
  scrollToTop()

  // Update page title to show current filter
  const blogTitle = document.querySelector(".blog-posts h2")
  if (!blogTitle) {
    const titleElement = document.createElement("h2")
    titleElement.style.marginBottom = "1.5rem"
    titleElement.style.color = "var(--text-primary)"
    titleElement.style.fontSize = "1.5rem"
    titleElement.style.fontWeight = "600"
    blogContainer.parentNode.insertBefore(titleElement, blogContainer)
  }

  const titleElement = blogContainer.parentNode.querySelector("h2")
  if (category === "All") {
    titleElement.textContent = "All Blog Posts"
  } else {
    titleElement.textContent = `${category} Posts`
  }
}

// Add event listeners for category filtering
document.addEventListener("DOMContentLoaded", () => {
  // Add click event listeners to category links
  const categoryLinks = document.querySelectorAll(".category-list a")
  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const categoryText = link.textContent.trim()
      // Extract category name (remove the count number)
      const category = categoryText.substring(0, categoryText.lastIndexOf(" ")).trim()
      filterByCategory(category)
    })
  })

  // Update category counts
  updateCategoryCounts()

  // Initialize with all posts
  filterByCategory("All")
})

// DOM elements
const blogContainer = document.getElementById("blogContainer")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const pageInfo = document.getElementById("pageInfo")

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

if (mobileMenuBtn && navMenu) {
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
}

// Event listeners for pagination
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--
    renderBlogPosts()
    scrollToTop()
  }
})

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  if (currentPage < totalPages) {
    currentPage++
    renderBlogPosts()
    scrollToTop()
  }
})

// Function to scroll to top of blog section
function scrollToTop() {
  document.querySelector(".main-content").scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// FAQ functionality
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
      })

  
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
})

// Contact button functionality
const contactBtn = document.querySelector(".contact-btn")
if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    document.querySelector(".footer").scrollIntoView({ behavior: "smooth" })
  })
}

// Apply button functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("apply-btn")) {
    alert("Application form will open here. Please call us at 9875986348756 for immediate assistance.")
  }
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