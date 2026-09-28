(function () {
  function pickArray(payload) {
    if (Array.isArray(payload)) return payload;
    if (!payload || typeof payload !== 'object') return [];
    const candidates = ['data', 'results', 'list', 'items', 'friends'];
    for (const key of candidates) {
      if (Array.isArray(payload[key])) return payload[key];
    }
    return [];
  }

  function toAbsolute(baseUrl, maybePath) {
    try {
      return new URL(maybePath, baseUrl).toString();
    } catch (_) {
      return maybePath || '';
    }
  }

  async function requestJson(baseUrl, paths) {
    for (const path of paths) {
      try {
        const response = await fetch(toAbsolute(baseUrl, path), {
          credentials: 'omit',
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) continue;
        return await response.json();
      } catch (_) {
        // continue trying next endpoint
      }
    }
    return null;
  }

  function renderFriends(container, friends, baseUrl) {
    if (!friends.length) {
      container.innerHTML = '<p class="qexo-empty">暂未获取到友链数据。</p>';
      return;
    }

    const cards = friends.map((friend) => {
      const title = friend.name || friend.title || friend.nickname || '未命名';
      const description = friend.desc || friend.description || '';
      const link = friend.link || friend.url || '#';
      const avatar = friend.avatar || friend.image || friend.img || '';
      const safeLink = toAbsolute(baseUrl, link);

      return `
        <a class="qexo-friend-card" href="${safeLink}" target="_blank" rel="noopener noreferrer">
          ${avatar ? `<img class="qexo-friend-avatar" src="${toAbsolute(baseUrl, avatar)}" alt="${title}" loading="lazy">` : ''}
          <div class="qexo-friend-content">
            <h3>${title}</h3>
            ${description ? `<p>${description}</p>` : ''}
          </div>
        </a>
      `;
    });

    container.innerHTML = `<div class="qexo-friend-grid">${cards.join('')}</div>`;
  }

  async function loadQexoFriends(containerId, adminBaseUrl) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<p class="qexo-loading">友链加载中…</p>';
    const payload = await requestJson(adminBaseUrl, [
      '/api/friends/',
      '/api/link/',
      '/api/links/',
      '/friends.json'
    ]);

    const friends = pickArray(payload);
    renderFriends(container, friends, adminBaseUrl);
  }

  window.loadQexoFriends = loadQexoFriends;
})();
