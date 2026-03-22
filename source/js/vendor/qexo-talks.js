(function () {
  function pickArray(payload) {
    if (Array.isArray(payload)) return payload;
    if (!payload || typeof payload !== 'object') return [];
    const candidates = ['data', 'results', 'list', 'items', 'talks'];
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

  function formatDate(rawValue) {
    if (!rawValue) return '';
    const date = new Date(rawValue);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString('zh-CN', { hour12: false });
  }

  function renderTalks(container, talks, baseUrl) {
    if (!talks.length) {
      container.innerHTML = '<p class="qexo-empty">暂无说说内容。</p>';
      return;
    }

    const html = talks.map((talk) => {
      const content = talk.content || talk.text || talk.body || '';
      const created = formatDate(talk.created || talk.created_at || talk.date || talk.pub_time);
      const images = Array.isArray(talk.images) ? talk.images : [];
      const imageHtml = images
        .map((img) => `<img src="${toAbsolute(baseUrl, img)}" loading="lazy" alt="talk image">`)
        .join('');

      return `
        <article class="qexo-talk-item">
          <p class="qexo-talk-content">${content}</p>
          ${imageHtml ? `<div class="qexo-talk-images">${imageHtml}</div>` : ''}
          ${created ? `<time class="qexo-talk-time">${created}</time>` : ''}
        </article>
      `;
    }).join('');

    container.innerHTML = `<div class="qexo-talk-list">${html}</div>`;
  }

  async function showQexoTalks(containerId, adminBaseUrl, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<p class="qexo-loading">说说加载中…</p>';
    const payload = await requestJson(adminBaseUrl, [
      `/api/talks/?limit=${Number(limit) || 5}`,
      '/api/talks/',
      '/api/shuoshuo/',
      '/talks.json'
    ]);

    const talks = pickArray(payload).slice(0, Number(limit) || 5);
    renderTalks(container, talks, adminBaseUrl);
  }

  window.showQexoTalks = showQexoTalks;
})();
