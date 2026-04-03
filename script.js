// ========== 設定 ==========
// 請填入你的 Google OAuth Client ID 和 Apps Script Web App URL
var GOOGLE_CLIENT_ID = '595440238562-henn9m49kbdo276ghfc0e2q4gcmg21jm.apps.googleusercontent.com';
var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxlfL3F3FB4k7ut7Nt6JUJqjTTbQVIhmuAtZjQRjgrDMu5SaSTWDzLUjeCfB6LxxTTEw/exec';
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

// ========== 畫面切換 ==========
function showPortal() {
  loginScreen.classList.add('hidden');
  deniedScreen.classList.add('hidden');
  errorScreen.classList.add('hidden');
  siteHeader.classList.remove('hidden');
  tabGuilds.classList.remove('hidden');
  // tab-journal 由 tab 切換邏輯控制，預設不顯示
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
  var session = {
    email: email,
    expiry: Date.now() + SESSION_DURATION_MS
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
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
    // 有快取，直接驗證權限
    loginScreen.classList.add('hidden');
    checkPermission(session.email);
  }
  // 沒快取就維持登入畫面
}

// 等 Google SDK 載入完成後初始化
window.addEventListener('load', function() {
  onPageLoad();
});

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
document.querySelectorAll('[data-skill]').forEach(function(card) {
  card.addEventListener('click', function() {
    var overlay = document.getElementById('overlay-' + card.dataset.skill);
    if (overlay) overlay.classList.add('active');
  });
});

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
