// ========== 設定 ==========
// 請填入你的 Google OAuth Client ID 和 Apps Script Web App URL
var GOOGLE_CLIENT_ID = '595440238562-henn9m49kbdo276ghfc0e2q4gcmg21jm.apps.googleusercontent.com';
var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxlfL3F3FB4k7ut7Nt6JUJqjTTbQVIhmuAtZjQRjgrDMu5SaSTWDzLUjeCfB6LxxTTEw/exec';
// CMS Apps Script URL（工具與日誌資料來源，獨立的 Google Sheet）
// 部署後請把 URL 貼在這裡
var CMS_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5zXtufHHxiNmQuR1KMHdtAMVpFLs9o7iySxwAtaLNPY03DbGTgmQkCvFzp7M6B7Bc/exec';
var SESSION_KEY = 'guild_auth_session';
var SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 小時
var CMS_CACHE_KEY = 'cms_cache';
var CMS_CACHE_TTL = 10 * 60 * 1000; // 10 分鐘


// ========== DOM 元素 ==========
var loginScreen = document.getElementById('login-screen');
var deniedScreen = document.getElementById('denied-screen');
var errorScreen = document.getElementById('error-screen');
var siteHeader = document.getElementById('site-header');
var tabGuilds = document.getElementById('tab-guilds');
var tabJournal = document.getElementById('tab-journal');
var tabBounty = document.getElementById('tab-bounty');
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
  tabBounty.classList.add('hidden');
  loginLoading.classList.add('hidden');
}

function showDenied() {
  loginScreen.classList.add('hidden');
  deniedScreen.classList.remove('hidden');
  errorScreen.classList.add('hidden');
  siteHeader.classList.add('hidden');
  tabGuilds.classList.add('hidden');
  tabJournal.classList.add('hidden');
  tabBounty.classList.add('hidden');
}

function showError() {
  loginScreen.classList.add('hidden');
  deniedScreen.classList.add('hidden');
  errorScreen.classList.remove('hidden');
  siteHeader.classList.add('hidden');
  tabGuilds.classList.add('hidden');
  tabJournal.classList.add('hidden');
  tabBounty.classList.add('hidden');
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

// ========== CMS 快取 ==========
function getCMSCache() {
  try {
    var raw = localStorage.getItem(CMS_CACHE_KEY);
    if (!raw) return null;
    var cached = JSON.parse(raw);
    if (!cached || !cached.data || !cached.timestamp) return null;
    return cached;
  } catch (e) {
    return null;
  }
}

function setCMSCache(data) {
  try {
    localStorage.setItem(CMS_CACHE_KEY, JSON.stringify({
      data: data,
      timestamp: Date.now()
    }));
  } catch (e) {
    // localStorage 不可用時靜默失敗
  }
}

// ========== CMS 資料載入 ==========
function fetchCMSData() {
  var toolGrids = document.querySelectorAll('.tool-grid');
  var journalGrid = document.querySelector('.journal-grid');
  var cached = getCMSCache();

  if (cached) {
    // 有快取：立即渲染，不等 API
    renderToolCards(cached.data.tools || []);
    renderJournalCards(cached.data.journal || []);
    renderBounties(cached.data.bounties || []);
    bindSkillOverlays();

    var isExpired = (Date.now() - cached.timestamp) > CMS_CACHE_TTL;
    if (isExpired) {
      // 快取過期：背景更新，不影響已渲染畫面
      fetch(CMS_APPS_SCRIPT_URL)
        .then(function(res) {
          if (!res.ok) throw new Error('CMS API error');
          return res.json();
        })
        .then(function(data) {
          setCMSCache(data);
        })
        .catch(function() {
          // 背景更新失敗：靜默忽略
        });
    }
    return;
  }

  // 無快取：走原本的即時 fetch 流程
  startLoadingBar();
  toolGrids.forEach(function(grid) {
    grid.innerHTML = '<div class="tool-grid-loading">載入中...</div>';
  });
  if (journalGrid) {
    journalGrid.innerHTML = '<div class="tool-grid-loading">載入中...</div>';
  }

  fetch(CMS_APPS_SCRIPT_URL)
    .then(function(res) {
      if (!res.ok) throw new Error('CMS API error');
      return res.json();
    })
    .then(function(data) {
      setCMSCache(data);
      renderToolCards(data.tools || []);
      renderJournalCards(data.journal || []);
      renderBounties(data.bounties || []);
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

// ========== 懸賞任務 ==========
var ICON_TRASH = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect x="3" y="2" width="10" height="1" fill="currentColor"/><rect x="6" y="1" width="4" height="1" fill="currentColor"/><rect x="4" y="3" width="8" height="1" fill="currentColor"/><rect x="4" y="4" width="1" height="9" fill="currentColor"/><rect x="11" y="4" width="1" height="9" fill="currentColor"/><rect x="5" y="13" width="6" height="1" fill="currentColor"/><rect x="6" y="5" width="1" height="7" fill="currentColor"/><rect x="9" y="5" width="1" height="7" fill="currentColor"/></svg>';

var pendingDeleteRow = null;

function showDeleteModal(row) {
  pendingDeleteRow = row;
  document.getElementById('confirm-modal-overlay').classList.remove('hidden');
}

function cancelDelete() {
  pendingDeleteRow = null;
  document.getElementById('confirm-modal-overlay').classList.add('hidden');
}

function confirmDelete() {
  var row = pendingDeleteRow;
  if (!row) return;
  document.getElementById('confirm-modal-overlay').classList.add('hidden');

  // Optimistic: 移除卡片
  var bounties = getLocalBounties();
  var removedBounty = null;
  var removedIndex = -1;
  for (var i = 0; i < bounties.length; i++) {
    if (bounties[i].row === row) {
      removedBounty = bounties[i];
      removedIndex = i;
      break;
    }
  }
  if (removedIndex === -1) return;

  bounties.splice(removedIndex, 1);
  updateLocalBounties(bounties);
  pendingDeleteRow = null;

  // POST 刪除
  fetch(CMS_APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'deleteBounty', row: row })
  })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.success) {
        // 刪除成功：清除快取重新 fetch（row number 會重排）
        localStorage.removeItem(CMS_CACHE_KEY);
        fetchCMSData();
      }
    })
    .catch(function() {
      // 失敗：還原卡片
      var current = getLocalBounties();
      current.splice(removedIndex, 0, removedBounty);
      updateLocalBounties(current);
    });
}

function emailToDisplayName(email) {
  return email.split('@')[0].replace(/\./g, ' ');
}

function daysAgo(dateStr) {
  var d = new Date(dateStr);
  var now = new Date();
  var diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (diff === 0) return '今天';
  return diff + ' 天前';
}

// ---- Optimistic UI 本地快取操作 ----
function getLocalBounties() {
  var cached = getCMSCache();
  if (cached && cached.data && cached.data.bounties) {
    return cached.data.bounties;
  }
  return [];
}

function updateLocalBounties(bounties) {
  var cached = getCMSCache();
  if (cached && cached.data) {
    cached.data.bounties = bounties;
    setCMSCache(cached.data);
  } else {
    setCMSCache({ tools: [], journal: [], bounties: bounties });
  }
  renderBounties(bounties);
}

function todayStr() {
  var d = new Date();
  var mm = ('0' + (d.getMonth() + 1)).slice(-2);
  var dd = ('0' + d.getDate()).slice(-2);
  return d.getFullYear() + '-' + mm + '-' + dd;
}

// ---- 重新整理 ----
function handleRefresh() {
  var btn = document.getElementById('bounty-refresh');
  if (!btn) return;
  btn.textContent = '載入中...';
  btn.disabled = true;
  localStorage.removeItem(CMS_CACHE_KEY);
  fetch(CMS_APPS_SCRIPT_URL)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      setCMSCache(data);
      renderToolCards(data.tools || []);
      renderJournalCards(data.journal || []);
      renderBounties(data.bounties || []);
      bindSkillOverlays();
    })
    .catch(function() {})
    .finally(function() {
      btn.textContent = '重新整理';
      btn.disabled = false;
    });
}

// ---- 排行榜 ----
function renderLeaderboards(bounties) {
  // 勇者排行榜：status=done 的 challenger 計數前三
  var heroCounts = {};
  var heroNames = {};
  bounties.forEach(function(b) {
    if (b.status === 'done' && b.challenger) {
      var email = b.challenger;
      heroCounts[email] = (heroCounts[email] || 0) + 1;
      if (!heroNames[email]) {
        heroNames[email] = emailToDisplayName(email);
      }
    }
  });
  var heroRanking = Object.keys(heroCounts).map(function(email) {
    return { name: heroNames[email], count: heroCounts[email] };
  }).sort(function(a, b) { return b.count - a.count; }).slice(0, 3);

  // 村長排行榜：commissioner 計數前三
  var chiefCounts = {};
  bounties.forEach(function(b) {
    var name = b.commissioner;
    if (name) {
      chiefCounts[name] = (chiefCounts[name] || 0) + 1;
    }
  });
  var chiefRanking = Object.keys(chiefCounts).map(function(name) {
    return { name: name, count: chiefCounts[name] };
  }).sort(function(a, b) { return b.count - a.count; }).slice(0, 3);

  // 渲染勇者排行榜
  var heroList = document.getElementById('hero-leaderboard-list');
  if (heroList) {
    if (heroRanking.length === 0) {
      heroList.innerHTML = '<li class="leaderboard-empty">還沒有完成任務的勇者</li>';
    } else {
      heroList.innerHTML = heroRanking.map(function(h) {
        return '<li><span class="leaderboard-name">' + escapeHtml(h.name) + '</span><span class="leaderboard-count">' + h.count + ' 次</span></li>';
      }).join('');
    }
  }

  // 渲染村長排行榜
  var chiefList = document.getElementById('chief-leaderboard-list');
  if (chiefList) {
    if (chiefRanking.length === 0) {
      chiefList.innerHTML = '<li class="leaderboard-empty">還沒有人發佈懸賞</li>';
    } else {
      chiefList.innerHTML = chiefRanking.map(function(c) {
        return '<li><span class="leaderboard-name">' + escapeHtml(c.name) + '</span><span class="leaderboard-count">' + c.count + ' 則</span></li>';
      }).join('');
    }
  }
}

// ---- Optimistic 新增懸賞 ----
function submitBounty() {
  var input = document.getElementById('bounty-input');
  var task = (input.value || '').trim();
  if (!task) {
    input.style.borderColor = '#c45c5c';
    input.focus();
    return;
  }
  input.style.borderColor = '';

  var session = getSession();
  if (!session) return;

  var displayName = emailToDisplayName(session.email);
  var tempRow = 'temp_' + Date.now();
  var newBounty = {
    row: tempRow,
    date: todayStr(),
    commissioner: displayName,
    task: task,
    plusOneCount: 1,
    plusOneList: session.email,
    challenger: '',
    status: '',
    completionDate: '',
    daysSpent: 0
  };

  // 立即渲染
  var bounties = getLocalBounties();
  bounties.push(newBounty);
  updateLocalBounties(bounties);
  input.value = '';

  // 背景 POST
  fetch(CMS_APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'newBounty', commissioner: session.email, task: task, plusOneCount: 1 })
  })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.success) {
        // 用伺服器回傳的 row 更新臨時 row
        var current = getLocalBounties();
        for (var i = 0; i < current.length; i++) {
          if (current[i].row === tempRow) {
            current[i].row = data.row;
            break;
          }
        }
        updateLocalBounties(current);
      }
    })
    .catch(function() {
      // 失敗：移除 optimistic 新增的卡片
      var current = getLocalBounties();
      var filtered = current.filter(function(b) { return b.row !== tempRow; });
      updateLocalBounties(filtered);
    });
}

function fetchBounties() {
  var bounties = getLocalBounties();
  renderBounties(bounties);

  // 如果快取過期或沒有快取，從 API 取得
  var cached = getCMSCache();
  var isExpired = !cached || (Date.now() - cached.timestamp) > CMS_CACHE_TTL;
  if (isExpired) {
    fetch(CMS_APPS_SCRIPT_URL)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        setCMSCache(data);
        renderBounties(data.bounties || []);
      })
      .catch(function() {});
  }
}

function renderBounties(bounties) {
  var session = getSession();
  var currentEmail = session ? session.email : '';

  // FLIP: 記錄渲染前每張卡片的位置
  var oldPositions = {};
  var listEl = document.getElementById('bounty-list');
  var doneList = document.getElementById('bounty-done-list');
  var existingCards = listEl.querySelectorAll('.bounty-card[data-row]');
  existingCards.forEach(function(card) {
    oldPositions[card.dataset.row] = card.getBoundingClientRect().top;
  });
  var existingDoneCards = doneList ? doneList.querySelectorAll('.bounty-card[data-row]') : [];
  existingDoneCards.forEach(function(card) {
    oldPositions[card.dataset.row] = card.getBoundingClientRect().top;
  });

  // 分為進行中和已完成
  var active = [];
  var done = [];
  bounties.forEach(function(b) {
    if (b.status === 'done') {
      done.push(b);
    } else {
      active.push(b);
    }
  });

  // 排序：進行中 → +1 多的在上，同數則委託早的在上
  active.sort(function(a, b) {
    if (b.plusOneCount !== a.plusOneCount) return b.plusOneCount - a.plusOneCount;
    return (a.date || '').localeCompare(b.date || '');
  });

  // 排序：已完成 → 越新完成的在上
  done.sort(function(a, b) {
    return (b.completionDate || '').localeCompare(a.completionDate || '');
  });

  // 渲染進行中
  listEl.innerHTML = '';
  if (active.length === 0 && done.length === 0) {
    listEl.innerHTML = '<div style="text-align:center;padding:32px;color:#a0a09b;font-size:14px;">還沒有懸賞任務，來發佈第一個吧！</div>';
  }
  active.forEach(function(b) {
    var card = renderBountyCard(b, currentEmail, false);
    card.dataset.row = b.row;
    listEl.appendChild(card);
  });

  // 渲染已完成
  var doneSection = document.getElementById('bounty-done-section');
  if (done.length > 0) {
    doneSection.classList.remove('hidden');
    doneList.innerHTML = '';
    done.forEach(function(b) {
      var card = renderBountyCard(b, currentEmail, true);
      card.dataset.row = b.row;
      doneList.appendChild(card);
    });
  } else {
    doneSection.classList.add('hidden');
  }

  // FLIP: 計算新位置並做動畫
  var allNewCards = listEl.querySelectorAll('.bounty-card[data-row]');
  var allDoneNewCards = doneList ? doneList.querySelectorAll('.bounty-card[data-row]') : [];
  var animate = function(cards) {
    cards.forEach(function(card) {
      var row = card.dataset.row;
      if (oldPositions[row] !== undefined) {
        var newTop = card.getBoundingClientRect().top;
        var deltaY = oldPositions[row] - newTop;
        if (deltaY !== 0) {
          card.style.transform = 'translateY(' + deltaY + 'px)';
          card.style.transition = 'none';
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              card.style.transition = 'transform 0.3s ease';
              card.style.transform = '';
            });
          });
        }
      }
    });
  };
  animate(allNewCards);
  animate(allDoneNewCards);

  // 渲染排行榜
  renderLeaderboards(bounties);
}

function renderBountyCard(bounty, currentEmail, isDone) {
  var card = document.createElement('div');
  card.className = 'bounty-card' + (isDone ? ' bounty-card--done' : '');

  var hasVoted = bounty.plusOneList && bounty.plusOneList.split(',').indexOf(currentEmail) !== -1;
  var isChallenger = bounty.challenger === currentEmail;
  var hasChallengerOther = bounty.challenger && !isChallenger;
  var challengerName = bounty.challenger ? emailToDisplayName(bounty.challenger) : '';

  var html = '';

  if (!isDone) {
    html += '<button class="bounty-delete-btn" onclick="event.stopPropagation();showDeleteModal(' + bounty.row + ')" title="刪除">' + ICON_TRASH + '</button>';
  }

  if (isDone) {
    html += '<span class="bounty-done-badge">任務完成</span>';
  }

  html += '<div class="bounty-card-task">' + escapeHtml(bounty.task) + '</div>';
  html += '<div class="bounty-card-meta">';
  html += '<span>' + escapeHtml(bounty.commissioner) + '</span>';
  html += '<span>' + daysAgo(bounty.date) + '</span>';
  if (isDone) {
    html += '<span>' + escapeHtml(bounty.completionDate) + ' 完成</span>';
    html += '<span>花了 ' + bounty.daysSpent + ' 天</span>';
  }
  html += '</div>';

  if (!isDone) {
    html += '<div class="bounty-card-actions">';
    // +1 按鈕
    html += '<button class="bounty-btn' + (hasVoted ? ' bounty-btn--voted' : '') + '" ' +
      'onclick="' + (hasVoted ? 'handleUnplusOne(' + bounty.row + ')' : 'handlePlusOne(' + bounty.row + ')') + '"' +
      '>+' + bounty.plusOneCount + '</button>';

    // 挑戰按鈕
    if (!bounty.challenger) {
      html += '<button class="bounty-btn bounty-btn--action" onclick="handleChallenge(' + bounty.row + ')">我想挑戰</button>';
    } else if (isChallenger) {
      html += '<button class="bounty-btn bounty-btn--action bounty-btn--challenge" onclick="handleChallenge(' + bounty.row + ')">取消挑戰</button>';
      html += '<button class="bounty-btn bounty-btn--action bounty-btn--complete" onclick="handleComplete(' + bounty.row + ')">完成任務</button>';
    } else {
      html += '<span class="bounty-challenger">挑戰勇者：' + escapeHtml(challengerName) + '</span>';
    }

    html += '</div>';
  } else {
    html += '<div class="bounty-card-actions">';
    html += '<button class="bounty-btn bounty-btn--voted" disabled>+' + bounty.plusOneCount + '</button>';
    if (challengerName) {
      html += '<span class="bounty-challenger bounty-challenger--done">完成勇者：' + escapeHtml(challengerName) + '</span>';
    }
    html += '</div>';
  }

  card.innerHTML = html;
  return card;
}

// ---- Optimistic +1 ----
function handlePlusOne(row) {
  var session = getSession();
  if (!session) return;
  var email = session.email;

  var bounties = getLocalBounties();
  var target = null;
  var oldCount, oldList;
  for (var i = 0; i < bounties.length; i++) {
    if (bounties[i].row === row) {
      target = bounties[i];
      oldCount = target.plusOneCount;
      oldList = target.plusOneList;
      target.plusOneCount = oldCount + 1;
      target.plusOneList = oldList ? oldList + ',' + email : email;
      break;
    }
  }
  if (!target) return;
  updateLocalBounties(bounties);

  fetch(CMS_APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'plusOne', row: row, email: email })
  })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.success) {
        // rollback
        var current = getLocalBounties();
        for (var i = 0; i < current.length; i++) {
          if (current[i].row === row) {
            current[i].plusOneCount = oldCount;
            current[i].plusOneList = oldList;
            break;
          }
        }
        updateLocalBounties(current);
      }
    })
    .catch(function() {
      var current = getLocalBounties();
      for (var i = 0; i < current.length; i++) {
        if (current[i].row === row) {
          current[i].plusOneCount = oldCount;
          current[i].plusOneList = oldList;
          break;
        }
      }
      updateLocalBounties(current);
    });
}

// ---- Optimistic 收回 +1 ----
function handleUnplusOne(row) {
  var session = getSession();
  if (!session) return;
  var email = session.email;

  var bounties = getLocalBounties();
  var target = null;
  var oldCount, oldList;
  for (var i = 0; i < bounties.length; i++) {
    if (bounties[i].row === row) {
      target = bounties[i];
      oldCount = target.plusOneCount;
      oldList = target.plusOneList;
      target.plusOneCount = Math.max(0, oldCount - 1);
      var emails = oldList ? oldList.split(',') : [];
      var idx = emails.indexOf(email);
      if (idx !== -1) emails.splice(idx, 1);
      target.plusOneList = emails.join(',');
      break;
    }
  }
  if (!target) return;
  updateLocalBounties(bounties);

  fetch(CMS_APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'plusOne', row: row, email: email })
  })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.success) {
        var current = getLocalBounties();
        for (var i = 0; i < current.length; i++) {
          if (current[i].row === row) {
            current[i].plusOneCount = oldCount;
            current[i].plusOneList = oldList;
            break;
          }
        }
        updateLocalBounties(current);
      }
    })
    .catch(function() {
      var current = getLocalBounties();
      for (var i = 0; i < current.length; i++) {
        if (current[i].row === row) {
          current[i].plusOneCount = oldCount;
          current[i].plusOneList = oldList;
          break;
        }
      }
      updateLocalBounties(current);
    });
}

// ---- Optimistic 挑戰 ----
function handleChallenge(row) {
  var session = getSession();
  if (!session) return;
  var email = session.email;

  var bounties = getLocalBounties();
  var target = null;
  var oldChallenger;
  for (var i = 0; i < bounties.length; i++) {
    if (bounties[i].row === row) {
      target = bounties[i];
      oldChallenger = target.challenger;
      // toggle: 無人→寫入、自己→清空
      target.challenger = (oldChallenger === email) ? '' : email;
      break;
    }
  }
  if (!target) return;
  updateLocalBounties(bounties);

  fetch(CMS_APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'challenge', row: row, email: email })
  })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.success) {
        var current = getLocalBounties();
        for (var i = 0; i < current.length; i++) {
          if (current[i].row === row) {
            current[i].challenger = oldChallenger;
            break;
          }
        }
        updateLocalBounties(current);
      }
    })
    .catch(function() {
      var current = getLocalBounties();
      for (var i = 0; i < current.length; i++) {
        if (current[i].row === row) {
          current[i].challenger = oldChallenger;
          break;
        }
      }
      updateLocalBounties(current);
    });
}

// ---- Optimistic 完成 ----
function handleComplete(row) {
  var session = getSession();
  if (!session) return;
  var email = session.email;

  var bounties = getLocalBounties();
  var target = null;
  for (var i = 0; i < bounties.length; i++) {
    if (bounties[i].row === row) {
      target = bounties[i];
      break;
    }
  }
  if (!target) return;

  var today = todayStr();
  var commDate = new Date(target.date);
  var daysSpent = Math.round((new Date() - commDate) / (1000 * 60 * 60 * 24));

  target.status = 'done';
  target.completionDate = today;
  target.daysSpent = daysSpent;
  updateLocalBounties(bounties);

  fetch(CMS_APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'complete', row: row, email: email })
  })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.success) {
        var current = getLocalBounties();
        for (var i = 0; i < current.length; i++) {
          if (current[i].row === row) {
            current[i].status = '';
            current[i].completionDate = '';
            current[i].daysSpent = 0;
            break;
          }
        }
        updateLocalBounties(current);
      }
    })
    .catch(function() {
      var current = getLocalBounties();
      for (var i = 0; i < current.length; i++) {
        if (current[i].row === row) {
          current[i].status = '';
          current[i].completionDate = '';
          current[i].daysSpent = 0;
          break;
        }
      }
      updateLocalBounties(current);
    });
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
