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

    // Twitch Integration
    // Replace these values with your own Twitch credentials
    const TWITCH_CLIENT_ID = 'm8ru8xyr0m6o8ywfvm6x6rwa9iub9d';
    const TWITCH_ACCESS_TOKEN = '4jow7a04zk0jt7a1ihygih2vcqrb7i
';
    const TWITCH_USERNAME = 'celesteauroraiana';

    async function fetchTwitchStats() {
      try {
        const response = await fetch(`https://api.twitch.tv/helix/users?login=${TWITCH_USERNAME}`, {
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${TWITCH_ACCESS_TOKEN}`
          }
        });

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const user = data.data[0];

          // Example placeholders because Twitch Helix does not publicly return followers directly anymore.
          // You can integrate StreamElements, SullyGnome, or your own backend for advanced metrics.
          animateValue('twitchFollowers', 18500);
          animateValue('twitchViews', 1200000);

          checkLiveStatus(user.id);
        }
      } catch (error) {
        console.error('Twitch API Error:', error);
      }
    }

    async function checkLiveStatus(userId) {
      try {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${TWITCH_ACCESS_TOKEN}`
          }
        });

        const data = await response.json();

        const liveStatus = document.getElementById('twitchLiveStatus');

        if (data.data && data.data.length > 0) {
          liveStatus.innerText = 'LIVE';
          liveStatus.style.color = '#b61fed';
        } else {
          liveStatus.innerText = 'Offline';
        }
      } catch (error) {
        console.error('Live Status Error:', error);
      }
    }

    function animateValue(id, target) {
      const element = document.getElementById(id);
      let current = 0;
      const increment = target / 100;

      const update = () => {
        current += increment;

        if (current < target) {
          element.innerText = Math.floor(current).toLocaleString();
          requestAnimationFrame(update);
        } else {
          element.innerText = target.toLocaleString();
        }
      };

      update();
    }

    fetchTwitchStats();
