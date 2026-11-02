// STAY Properties - JavaScript functionality

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Property search and type filter
  const searchInput = document.getElementById('propertySearch');
  const typeSelect = document.getElementById('propertyType');
  const propertyCount = document.getElementById('propertyCount');
  const cards = document.querySelectorAll('.listing-card[data-search]');

  const filterProperties = () => {
    if (!searchInput || !typeSelect || !propertyCount || cards.length === 0) return;

    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedType = typeSelect.value;
    let visible = 0;

    cards.forEach(card => {
      const searchableText = `${card.dataset.search} ${card.textContent}`.toLowerCase();
      const matchesSearch = searchableText.includes(searchTerm);
      const matchesType = selectedType === 'all' || card.dataset.type === selectedType;
      const show = matchesSearch && matchesType;

      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });

    propertyCount.textContent = `${visible} ${visible === 1 ? 'property' : 'properties'} shown`;
  };

  if (searchInput && typeSelect) {
    searchInput.addEventListener('input', filterProperties);
    typeSelect.addEventListener('change', filterProperties);
  }

  // Enquiry form validation and confirmation message
  const enquiryForm = document.getElementById('enquiryForm');
  const formMessage = document.getElementById('formMessage');

  if (enquiryForm && formMessage) {
    enquiryForm.addEventListener('submit', event => {
      event.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        formMessage.textContent = 'Please complete your name, email address and message.';
        return;
      }

      if (!email.validity.valid) {
        formMessage.textContent = 'Please enter a valid email address.';
        email.focus();
        return;
      }

      formMessage.textContent = `Thank you, ${name.value.trim()}! Your enquiry has been received.`;
      enquiryForm.reset();
    });
  }
});
