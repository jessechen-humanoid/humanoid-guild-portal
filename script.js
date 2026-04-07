// ========== 設定 ==========
// 請填入你的 Google OAuth Client ID 和 Apps Script Web App URL
var GOOGLE_CLIENT_ID = '595440238562-henn9m49kbdo276ghfc0e2q4gcmg21jm.apps.googleusercontent.com';
var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxlfL3F3FB4k7ut7Nt6JUJqjTTbQVIhmuAtZjQRjgrDMu5SaSTWDzLUjeCfB6LxxTTEw/exec';
// CMS Apps Script URL（工具與日誌資料來源，獨立的 Google Sheet）
// 部署後請把 URL 貼在這裡
var CMS_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5zXtufHHxiNmQuR1KMHdtAMVpFLs9o7iySxwAtaLNPY03DbGTgmQkCvFzp7M6B7Bc/exec';
var SESSION_KEY = 'guild_auth_session';
var SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 小時

// ========== DOM 元素 ==========
var loginScreen = document.getElementById('login-screen');
var deniedScreen = document.getElementById('denied-screen');
var errorScreen = document.getElementById('error-screen');
var siteHeader = document.getElementById('site-header');
var tabGuilds = document.getElementById('tab-guilds');
var tabJournal = document.getElementById('tab-journal');
var loginLoading = document.getElementById('login-loading');

// ========== 登入流程 ==========
function handleGoogleSignIn(response) {
  var payload = parseJwt(response.credential);
  var email = payload.email;
  var name = payload.name || '';
  var picture = payload.picture || '';

  // 暫存使用者資訊，等權限確認後一起寫入 session
  window._pendingUserInfo = { name: name, picture: picture };

  // 顯示載入中
  loginLoading.classList.remove('hidden');

  checkPermission(email);
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function checkPermission(email) {
  fetch(APPS_SCRIPT_URL + '?email=' + encodeURIComponent(email))
    .then(function(res) {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(function(data) {
      if (data.authorized) {
        saveSession(email);
        showPortal();
      } else {
        showDenied();
      }
    })
    .catch(function() {
      showError();
    });
}

// ========== 公會與 Section ID 對應 ==========
var GUILD_SECTION_MAP = {
  '營運公會': 'operations',
  '創意公會': 'creative',
  '業務公會': 'business'
};

// ========== 畫面切換 ==========
function showPortal() {
  loginScreen.classList.add('hidden');
  deniedScreen.classList.add('hidden');
  errorScreen.classList.add('hidden');
  siteHeader.classList.remove('hidden');
  tabGuilds.classList.remove('hidden');
  // tab-journal 由 tab 切換邏輯控制，預設不顯示
  fetchCMSData();
}

function showLogin() {
  loginScreen.classList.remove('hidden');
  deniedScreen.classList.add('hidden');
  errorScreen.classList.add('hidden');
  siteHeader.classList.add('hidden');
  tabGuilds.classList.add('hidden');
  tabJournal.classList.add('hidden');
  loginLoading.classList.add('hidden');
}

function showDenied() {
  loginScreen.classList.add('hidden');
  deniedScreen.classList.remove('hidden');
  errorScreen.classList.add('hidden');
  siteHeader.classList.add('hidden');
  tabGuilds.classList.add('hidden');
  tabJournal.classList.add('hidden');
}

function showError() {
  loginScreen.classList.add('hidden');
  deniedScreen.classList.add('hidden');
  errorScreen.classList.remove('hidden');
  siteHeader.classList.add('hidden');
  tabGuilds.classList.add('hidden');
  tabJournal.classList.add('hidden');
}

// ========== Session 快取 ==========
function saveSession(email) {
  var info = window._pendingUserInfo || {};
  var session = {
    email: email,
    name: info.name || '',
    picture: info.picture || '',
    expiry: Date.now() + SESSION_DURATION_MS
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  displayUserInfo(session);
}

function getSession() {
  try {
    var raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    var session = JSON.parse(raw);
    if (Date.now() > session.expiry) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch (e) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function displayUserInfo(session) {
  var avatar = document.getElementById('user-avatar');
  var name = document.getElementById('user-name');
  if (avatar && session.picture) {
    avatar.src = session.picture;
    avatar.alt = session.name;
  }
  if (name) {
    name.textContent = session.name;
  }
}

// ========== 登出 ==========
function handleLogout() {
  clearSession();
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.disableAutoSelect();
  }
  showLogin();
  // 重新初始化 Google Sign-In 按鈕
  initGoogleSignIn();
}

// ========== 重新登入 ==========
function handleRetryLogin() {
  clearSession();
  showLogin();
  initGoogleSignIn();
}

// ========== Google Sign-In 初始化 ==========
function initGoogleSignIn() {
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleSignIn,
      auto_select: false
    });
    // 重新渲染按鈕
    var btnContainer = document.querySelector('.g_id_signin');
    if (btnContainer) {
      btnContainer.innerHTML = '';
      google.accounts.id.renderButton(btnContainer, {
        type: 'standard',
        size: 'large',
        theme: 'outline',
        text: 'sign_in_with',
        shape: 'rectangular',
        logo_alignment: 'left'
      });
    }
  }
}

// ========== 頁面載入 ==========
function onPageLoad() {
  var session = getSession();
  if (session) {
    // 有快取，先顯示使用者資訊，再驗證權限
    loginScreen.classList.add('hidden');
    displayUserInfo(session);
    checkPermission(session.email);
  }
  // 沒快取就維持登入畫面
}

// 等 Google SDK 載入完成後初始化
window.addEventListener('load', function() {
  onPageLoad();
});

// ========== Loading Progress Bar ==========
var loadingBar = document.getElementById('loading-bar');
var loadingBarFill = document.getElementById('loading-bar-fill');
var loadingBarRunner = document.getElementById('loading-bar-runner');
var fakeProgressTimer = null;

function startLoadingBar() {
  loadingBar.classList.remove('hidden', 'done');
  loadingBarFill.style.width = '0%';
  loadingBarRunner.style.left = '0%';
  var progress = 0;
  fakeProgressTimer = setInterval(function() {
    // 快速到 60%，然後越來越慢，永遠不到 90%
    var remaining = 88 - progress;
    progress += remaining * 0.08;
    loadingBarFill.style.width = progress + '%';
    loadingBarRunner.style.left = progress + '%';
  }, 200);
}

function finishLoadingBar() {
  clearInterval(fakeProgressTimer);
  loadingBar.classList.add('done');
  setTimeout(function() {
    loadingBar.classList.add('hidden');
  }, 600);
}

// ========== CMS 資料載入 ==========
function fetchCMSData() {
  // 顯示 loading
  startLoadingBar();
  var toolGrids = document.querySelectorAll('.tool-grid');
  toolGrids.forEach(function(grid) {
    grid.innerHTML = '<div class="tool-grid-loading">載入中...</div>';
  });
  var journalGrid = document.querySelector('.journal-grid');
  if (journalGrid) {
    journalGrid.innerHTML = '<div class="tool-grid-loading">載入中...</div>';
  }

  fetch(CMS_APPS_SCRIPT_URL)
    .then(function(res) {
      if (!res.ok) throw new Error('CMS API error');
      return res.json();
    })
    .then(function(data) {
      renderToolCards(data.tools || []);
      renderJournalCards(data.journal || []);
      bindSkillOverlays();
      finishLoadingBar();
    })
    .catch(function() {
      toolGrids.forEach(function(grid) {
        grid.innerHTML = '<div class="tool-grid-error">無法載入工具資料，請稍後重新整理頁面</div>';
      });
      if (journalGrid) {
        journalGrid.innerHTML = '<div class="tool-grid-error">無法載入日誌資料，請稍後重新整理頁面</div>';
      }
      finishLoadingBar();
    });
}

function renderToolCards(tools) {
  // 先清空所有 tool-grid
  var toolGrids = document.querySelectorAll('.tool-grid');
  toolGrids.forEach(function(grid) {
    grid.innerHTML = '';
  });

  tools.forEach(function(tool) {
    var sectionId = GUILD_SECTION_MAP[tool.guild];
    if (!sectionId) return;
    var section = document.getElementById(sectionId);
    if (!section) return;
    var grid = section.querySelector('.tool-grid');
    if (!grid) return;

    if (tool.type === 'web') {
      var a = document.createElement('a');
      a.href = tool.link;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'tool-card';
      a.dataset.type = 'web';
      a.innerHTML =
        '<span class="tool-badge">Web</span>' +
        '<h3 class="tool-name">' + escapeHtml(tool.name) + '</h3>' +
        '<p class="tool-desc">' + escapeHtml(tool.description) + '</p>' +
        (tool.adventurer ? '<span class="tool-adventurer">by ' + escapeHtml(tool.adventurer) + '</span>' : '');
      grid.appendChild(a);
    } else if (tool.type === 'skill') {
      var div = document.createElement('div');
      div.className = 'tool-card';
      div.dataset.type = 'skill';
      div.dataset.skill = tool.link;
      div.innerHTML =
        '<span class="tool-badge">Skill</span>' +
        '<h3 class="tool-name">' + escapeHtml(tool.name) + '</h3>' +
        '<p class="tool-desc">' + escapeHtml(tool.description) + '</p>' +
        (tool.adventurer ? '<span class="tool-adventurer">by ' + escapeHtml(tool.adventurer) + '</span>' : '');
      grid.appendChild(div);
    }
  });
}

function renderJournalCards(journal) {
  var grid = document.querySelector('.journal-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // 按日期排序（新到舊）
  journal.sort(function(a, b) {
    return (b.date || '').localeCompare(a.date || '');
  });

  journal.forEach(function(entry) {
    var a = document.createElement('a');
    a.href = entry.filePath;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'tool-card';
    a.dataset.type = 'journal';
    a.innerHTML =
      '<span class="tool-badge">' + escapeHtml(entry.badge) + '</span>' +
      '<h3 class="tool-name">' + escapeHtml(entry.title) + '</h3>' +
      '<p class="tool-desc">' + escapeHtml(entry.description) + '</p>' +
      (entry.adventurer ? '<span class="tool-adventurer">by ' + escapeHtml(entry.adventurer) + '</span>' : '') +
      '<time class="journal-date">' + escapeHtml(entry.date) + '</time>';
    grid.appendChild(a);
  });
}

function bindSkillOverlays() {
  document.querySelectorAll('[data-skill]').forEach(function(card) {
    card.addEventListener('click', function() {
      var overlay = document.getElementById('overlay-' + card.dataset.skill);
      if (overlay) overlay.classList.add('active');
    });
  });
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ========== Tab 切換 ==========
document.querySelectorAll('.tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.add('hidden'); });
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
  });
});

// ========== Skill overlay ==========
function closeOverlay(el) {
  el.closest('.skill-overlay').classList.remove('active');
}

document.querySelectorAll('.skill-overlay').forEach(function(overlay) {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.skill-overlay.active').forEach(function(o) { o.classList.remove('active'); });
  }
});
