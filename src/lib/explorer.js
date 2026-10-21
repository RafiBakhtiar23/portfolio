// API Explorer: turns recorded requests/responses (public/projects/<slug>-explorer.json) into static HTML.
// No JavaScript runs in the browser: every request is a native <details> element.
// Everything that comes from the JSON file is escaped here, so the file can never inject markup.

const STATUS = { 200: 'OK', 201: 'Created', 204: 'No Content', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 409: 'Conflict', 422: 'Unprocessable Entity', 429: 'Too Many Requests', 500: 'Internal Server Error' };

export const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

// Colours the JSON: keys, strings, numbers, true/false/null. Works on the raw text, escapes every piece.
export function highlight(text) {
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
  let out = '', last = 0, m;
  while ((m = re.exec(text))) {
    out += esc(text.slice(last, m.index));
    if (m[1] !== undefined) out += m[2] ? `<span class="j-key">${esc(m[1])}</span>${esc(m[2])}` : `<span class="j-str">${esc(m[1])}</span>`;
    else if (m[3] !== undefined) out += `<span class="j-lit">${esc(m[3])}</span>`;
    else out += `<span class="j-num">${esc(m[0])}</span>`;
    last = re.lastIndex;
  }
  return out + esc(text.slice(last));
}

const pretty = (v) => (typeof v === 'string' ? v : JSON.stringify(v, null, 2));
const pick = (v, lang) => (v && typeof v === 'object' ? v[lang] ?? v.en ?? '' : v ?? '');
const klass = (status) => `s-${String(status).charAt(0)}xx`;

function requestBlock(step) {
  const head = [`<span class="j-lit">${esc(step.method)}</span> ${esc(step.path)}`];
  for (const [k, v] of Object.entries(step.requestHeaders || {})) head.push(`<span class="j-key">${esc(k)}</span>: ${esc(v)}`);
  const body = step.requestBody == null ? '' : '\n\n' + highlight(pretty(step.requestBody));
  return head.join('\n') + body;
}

function responseBlock(step) {
  const line = `<span class="j-lit">HTTP ${esc(step.status)}</span> ${esc(STATUS[step.status] || '')}`;
  const body = step.responseBody == null || step.responseBody === '' ? '' : '\n\n' + highlight(pretty(step.responseBody));
  return line + body;
}

// data: parsed explorer JSON. text: { request, response } labels. Returns an HTML string ('' when there is nothing to show).
export function renderExplorer(data, lang, text) {
  const steps = Array.isArray(data?.steps) ? data.steps.filter((s) => s && s.method && s.path && Number.isInteger(s.status)) : [];
  if (!steps.length) return '';
  const rows = steps.map((s, i) => {
    const method = String(s.method).toLowerCase().replace(/[^a-z]/g, '');
    return `<details class="xp"${i === 0 ? ' open' : ''}>` +
      `<summary><span class="xp-n">${String(i + 1).padStart(2, '0')}</span>` +
      `<span class="method m-${esc(method)}">${esc(s.method)}</span>` +
      `<code class="xp-path">${esc(s.path)}</code>` +
      `<span class="xp-status ${klass(s.status)}">${esc(s.status)}</span>` +
      `<span class="xp-title">${esc(pick(s.title, lang))}</span></summary>` +
      `<div class="xp-body"><div class="xp-pane"><h4>${esc(text.request)}</h4><pre>${requestBlock(s)}</pre></div>` +
      `<div class="xp-pane"><h4>${esc(text.response)}</h4><pre>${responseBlock(s)}</pre></div></div></details>`;
  });
  return `<div class="xp-list">${rows.join('')}</div>`;
}
