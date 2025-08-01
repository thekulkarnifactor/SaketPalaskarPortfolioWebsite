'use strict';

// Initialize EmailJS (replace YOUR_USER_ID with your actual public key)
emailjs.init('8pWLTJvdnntz5YyUO'); // e.g., 'user_ABCDEF123456'

// Utility function to toggle 'active' class
const toggleActive = (elem) => elem.classList.toggle('active');

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', () => toggleActive(sidebar));
  }

  // Navbar navigation
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('article[data-page]');

  navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      if (pages[index]) pages[index].classList.add('active');

      window.scrollTo(0, 0);
    });
  });

  // Contact form interaction
  const form = document.querySelector('[data-form]');
  const formInputs = form ? form.querySelectorAll('[data-form-input]') : [];
  const submitBtn = document.querySelector('[data-form-btn]');

  if (form && formInputs.length && submitBtn) {
    // Enable button only if form is valid
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        submitBtn.disabled = !form.checkValidity();
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      emailjs.sendForm('service_k78pom8', 'template_a245j3u', form)
        .then(() => {
          toastr.success('Message sent successfully!');
          form.reset();
          submitBtn.disabled = true;
        })
        .catch((error) => {
          toastr.error('An error occurred. Please try again.');
          console.error('Email.js error', error);
        });
    });
  }

  // Testimonials modal (omitted here for brevity, keep your existing implementation)

  // Portfolio filtering
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');
  const select = document.querySelector('[data-select]');
  const selectValue = document.querySelector('[data-selecct-value]');
  const selectItems = document.querySelectorAll('[data-select-item]');

  // Filtering function to show/hide projects
  function filterFunc(category) {
    const cat = category.toLowerCase();
    filterItems.forEach(item => {
      const itemCat = item.dataset.category.toLowerCase();
      if (cat === 'all' || itemCat === cat) {
        item.style.display = ''; // Show
      } else {
        item.style.display = 'none'; // Hide
      }
    });
  }

  // Toggle dropdown select open/close
  if (select && selectValue) {
    select.addEventListener('click', () => {
      toggleActive(select);
    });
  }

  // Click handler for dropdown select options
  if (selectItems.length) {
    selectItems.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.textContent.trim();
        selectValue.textContent = category;
        select.classList.remove('active');
        filterFunc(category);
        // Sync active button with select value
        filterBtns.forEach(btn => {
          btn.classList.toggle('active', btn.textContent.trim() === category);
        });
      });
    });
  }

  // Click handler for filter buttons
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.textContent.trim();
        filterFunc(category);
        selectValue.textContent = category;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Close dropdown if open
        if (select) select.classList.remove('active');
      });
    });
  }

  // Initialize: show all on load and set "All" active
  filterFunc('All');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === 'all');
  });
  if (selectValue) selectValue.textContent = 'All';

  // Blog filtering (your existing blog filter code can stay unchanged, or update as needed)
});
