  'use strict';


  const apiList = document.getElementById('apiList');
    const searchInput = document.getElementById('searchInput');

    // Load initial Dev.to blog posts
    const loadPosts = async () => {
      try {
        const res = await fetch('https://dev.to/api/articles?per_page=12');
        const data = await res.json();
        displayPosts(data);
      } catch (error) {
        apiList.innerHTML = `<p style="color:red;">Failed to load blog posts. Please try again later.</p>`;
      }
    };

    // Display blog post cards
    const displayPosts = (posts) => {
      apiList.innerHTML = '';

      if (posts.length === 0) {
        apiList.innerHTML = '<p>No posts match your search.</p>';
        return;
      }

      posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'api-card';
        card.innerHTML = `
          <h3><i class="fas fa-file-alt"></i> ${post.title}</h3>
          <p>${post.description || 'No description available.'}</p>
          <p><strong><i class="fas fa-user"></i> Author:</strong> ${post.user.name}</p>
          <a href="${post.url}" target="_blank">Read more ↗</a>
        `;
        apiList.appendChild(card);
      });
    };

    // Search functionality
    searchInput.addEventListener('input', async (e) => {
      const query = e.target.value.toLowerCase();
      try {
        const res = await fetch('https://dev.to/api/articles?per_page=100');
        const data = await res.json();
        const filtered = data.filter(post =>
          post.title.toLowerCase().includes(query) ||
          (post.description && post.description.toLowerCase().includes(query))
        );
        displayPosts(filtered.slice(0, 20));
      } catch (error) {
        apiList.innerHTML = `<p style="color:red;">Error filtering posts. Try again.</p>`;
      }
    });

    // Dark mode toggle
    function toggleTheme() {
      document.body.classList.toggle('dark');
      const icon = document.getElementById('themeIcon');
      icon.classList.toggle('fa-sun');
      icon.classList.toggle('fa-moon');
    }

    // Initial load
    loadPosts();