// Floating stars
    const starsContainer = document.getElementById('stars');

    for (let i = 0; i < 40; i++) {
      const star = document.createElement('span');

      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.animationDuration = (Math.random() * 5 + 3) + 's';
      star.style.animationDelay = Math.random() * 5 + 's';

      starsContainer.appendChild(star);
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      const increment = target / 120;

      const updateCounter = () => {
        const current = +counter.innerText;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCounter, 15);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.6
    });

    counters.forEach(counter => observer.observe(counter));
