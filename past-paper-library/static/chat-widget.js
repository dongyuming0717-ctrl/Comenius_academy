/**
 * Comenius AI Chat Widget — Amos
 * v3: KaTeX 数学渲染、交互式教学、完整答案按钮
 */
(function () {
  if (window !== window.parent) return; // skip in iframe — parent already has widget
  if (document.getElementById("chat-widget")) return;

  // ── DOM 结构 ──
  const widget = document.createElement("div");
  widget.id = "chat-widget";
  widget.innerHTML = `
    <div class="cw-panel" id="cwPanel">
      <div class="cw-resize-handle" id="cwResize"></div>
      <div class="cw-header">
        <div class="icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>
        <div>
          <div class="title">Amos</div>
          <div class="subtitle">TMUA 数学专精 · Comenius AI</div>
        </div>
        <button class="close-btn" id="cwClose">&times;</button>
      </div>
      <div class="cw-context-badge" id="cwContext" style="display:none"></div>
      <div class="cw-messages" id="cwMessages">
        <div class="cw-msg system">你好！我是 Amos，Comenius 的 AI 数学导师。<br>专精 TMUA，问我数学题，我能帮你查题、解答。</div>
      </div>
      <div class="cw-image-preview" id="cwImagePreview" style="display:none">
        <img id="cwImageThumb" src="" alt="preview">
        <button class="cw-image-remove" id="cwImageRemove">&times;</button>
      </div>
      <div class="cw-input-area">
        <button class="cw-img-btn" id="cwImgBtn" title="上传截图">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </button>
        <input type="file" accept="image/*" id="cwFileInput" style="display:none">
        <input id="cwInput" placeholder="问我 TMUA 数学题..." autofocus>
        <button class="cw-send-btn" id="cwSend">发送</button>
        <button class="cw-stop-btn" id="cwStop">■ 停止</button>
      </div>
    </div>
    <div class="cw-btn-wrap">
      <button class="cw-btn" id="cwBtn" title="Amos · Comenius AI">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
      <span class="cw-btn-label">AI 数学导师</span>
    </div>
  `;
  document.body.appendChild(widget);

  // ── 元素引用 ──
  const panel = document.getElementById("cwPanel");
  const btn = document.getElementById("cwBtn");
  const closeBtn = document.getElementById("cwClose");
  const messages = document.getElementById("cwMessages");
  const input = document.getElementById("cwInput");
  const sendBtn = document.getElementById("cwSend");
  const stopBtn = document.getElementById("cwStop");
  const contextBadge = document.getElementById("cwContext");
  let loading = false;
  let abortController = null;
  let streamDiv = null;
  let currentContext = null;
  let currentImage = null; // File object for screenshot upload
  let loadingTimeout = null; // 60s safety timeout

  // ── 截图上传元素引用 ──
  const imgBtn = document.getElementById("cwImgBtn");
  const fileInput = document.getElementById("cwFileInput");
  const imagePreview = document.getElementById("cwImagePreview");
  const imageThumb = document.getElementById("cwImageThumb");
  const imageRemove = document.getElementById("cwImageRemove");

  // ── Session ID (conversation memory) ──
  let sessionId = localStorage.getItem("amos_sid");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("amos_sid", sessionId);
  }

  // ── 事件 ──
  btn.addEventListener("click", () => {
    panel.classList.add("open");
    btn.parentElement.classList.add("open");
    input.focus();
  });

  closeBtn.addEventListener("click", closePanel);

  function closePanel() {
    panel.classList.remove("open", "expanded");
    btn.parentElement.classList.remove("open");
    cancelRequest();
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });

  sendBtn.addEventListener("click", send);

  stopBtn.addEventListener("click", () => {
    cancelRequest();
    setLoading(false);
    // 清理加载指示器
    const loaders = messages.querySelectorAll(".cw-loading");
    loaders.forEach((l) => l.closest(".cw-msg")?.remove());
  });

  // ── 截图上传 ──
  imgBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) setImage(file);
    fileInput.value = "";
  });

  imageRemove.addEventListener("click", clearImage);

  function setImage(file) {
    currentImage = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageThumb.src = e.target.result;
      imagePreview.style.display = "flex";
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    currentImage = null;
    imageThumb.src = "";
    imagePreview.style.display = "none";
  }

  // ── 粘贴截图监听 ──
  document.addEventListener("paste", (e) => {
    if (!panel.classList.contains("open")) return;
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) setImage(file);
        return;
      }
    }
  });

  // ── 拖拽图片到输入框 ──
  panel.addEventListener("dragover", (e) => { e.preventDefault(); });
  panel.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/")) setImage(file);
  });

  // ── 拖拽 resize ──
  const resizeHandle = document.getElementById("cwResize");
  let resizing = false;
  let startX, startY, startW, startH;

  resizeHandle.addEventListener("mousedown", (e) => {
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = panel.offsetWidth;
    startH = panel.offsetHeight;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!resizing) return;
    const w = Math.max(380, Math.min(800, startW + (startX - e.clientX)));
    const h = Math.max(400, Math.min(window.innerHeight - 80, startH + (startY - e.clientY)));
    panel.style.width = w + "px";
    panel.style.height = h + "px";
  });

  document.addEventListener("mouseup", () => {
    if (resizing) {
      resizing = false;
      document.body.style.userSelect = "";
    }
  });

  // ── 工具函数 ──
  function escHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // AI 消息轻量转义: 只防 XSS，保留 LaTeX 字符 (\ $ { } _ ^ 等)
  function sanitizeAI(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  }

  // Markdown → HTML 渲染 (marked.js + KaTeX)
  function renderMarkdown(text) {
    // 标准化分隔符: 将 \(\)/\[\] 统一为 $/$$ (兼容不同模型输出习惯)
    text = text.replace(/\\\[/g, "$$");
    text = text.replace(/\\\]/g, "$$");
    text = text.replace(/\\\(/g, "$");
    text = text.replace(/\\\)/g, "$");

    // 用占位符保护 LaTeX，避免 marked.js 破坏公式
    var mathBlocks = [];
    var idx = 0;

    // 1) 保护 $$...$$ 多行公式 (贪婪匹配，正确处理多块公式)
    var protected_ = text.replace(/\$\$([\s\S]*?)\$\$/g, function(_, math) {
      mathBlocks.push(math);
      return "@@MATH_" + (idx++) + "_MATH@@";
    });
    // 2) 保护裸 \begin{env}...\end{env} 数学环境
    protected_ = protected_.replace(/(\\begin\{[a-zA-Z]+\*?\}[\s\S]*?\\end\{[a-zA-Z]+\*?\})/g, function(_, math) {
      mathBlocks.push(math);
      return "@@MATH_" + (idx++) + "_MATH@@";
    });
    // 3) 保护 $...$ 行内公式 (不可跨行)
    protected_ = protected_.replace(/\$([^$\n]+?)\$/g, function(_, math) {
      mathBlocks.push(math);
      return "@@INLINE_" + (idx++) + "_INLINE@@";
    });

    var html;
    if (typeof marked !== "undefined" && typeof marked.parse === "function") {
      try {
        html = marked.parse(protected_);
      } catch (e) {
        html = sanitizeAI(text);
      }
    } else {
      html = sanitizeAI(text);
    }

    // 还原 LaTeX 公式
    html = html.replace(/@@MATH_(\d+)_MATH@@/g, function(_, i) {
      return "$$" + mathBlocks[parseInt(i)] + "$$";
    });
    html = html.replace(/@@INLINE_(\d+)_INLINE@@/g, function(_, i) {
      return "$" + mathBlocks[parseInt(i)] + "$";
    });

    return html;
  }

  // KaTeX 渲染 — 对元素内的 $...$ 和 $$...$$ 渲染为数学公式
  function renderMath(el) {
    if (typeof renderMathInElement !== "function") {
      console.warn("[Amos] KaTeX auto-render 未加载，数学公式将无法渲染");
      return;
    }
    try {
      renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    } catch (e) {
      console.warn("[Amos] KaTeX 渲染异常:", e.message);
    }
  }

  function addMsg(type, html) {
    const div = document.createElement("div");
    div.className = "cw-msg " + type;
    div.innerHTML = html;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function addToolBlock(tool, args) {
    const isRag = tool === "search_worked_answers";
    const isLookup = tool === "lookup_question";
    const emoji = isRag ? "📚" : isLookup ? "🎯" : "🔍";
    const name = isRag ? "真题检索" : isLookup ? "精确查题" : tool;
    const div = document.createElement("div");
    div.className = "cw-tool";
    div.innerHTML = `
      <div class="name">${emoji} ${name}</div>
      <div class="args">${escHtml(JSON.stringify(args))}</div>
      <div class="result"></div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function cancelRequest() {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  }

  function setLoading(loadingState) {
    loading = loadingState;
    input.disabled = loadingState;
    sendBtn.disabled = loadingState;
    if (loadingState) {
      sendBtn.style.display = "none";
      stopBtn.classList.add("visible");
      // 60s 安全超时：防止异常情况下 loading 永不消失
      loadingTimeout = setTimeout(() => {
        if (loading) {
          cancelRequest();
          setLoading(false);
          const loaders = messages.querySelectorAll(".cw-loading");
          loaders.forEach((l) => l.closest(".cw-msg")?.remove());
          addMsg("system", "⏱ 请求超时，请重试");
        }
      }, 60000);
    } else {
      clearTimeout(loadingTimeout);
      sendBtn.style.display = "";
      stopBtn.classList.remove("visible");
      input.focus();
    }
  }

  // ── 反馈按钮 ──
  function addFeedbackButtons(targetDiv) {
    if (targetDiv.querySelector(".cw-feedback")) return;
    const fb = document.createElement("div");
    fb.className = "cw-feedback";
    fb.innerHTML = `
      <button class="cw-fb-btn wrong">❌ 我做错了</button>
      <button class="cw-fb-btn ok">✅ 懂了</button>
      <button class="cw-fb-btn full">📝 完整答案</button>
    `;
    fb.querySelector(".wrong").addEventListener("click", () => {
      sendFollowUp("我上面这道题做错了，请帮我分析错在哪里，讲解正确的解题思路。不要直接给答案，先帮我找问题。");
      fb.remove();
    });
    fb.querySelector(".ok").addEventListener("click", () => {
      fb.innerHTML = '<span style="font-size:11px;color:var(--text-secondary,#64748b)">👍 太棒了！继续加油</span>';
    });
    fb.querySelector(".full").addEventListener("click", () => {
      sendFollowUp("请给我上面这道题的完整解答步骤和正确答案");
      fb.remove();
    });
    targetDiv.appendChild(fb);
  }

  // ── 跟进消息 ──
  function sendFollowUp(msg) {
    if (loading) return;
    setLoading(true);

    const loadDiv = addMsg(
      "system",
      '<div class="cw-loading"><div class="cw-dot"></div><div class="cw-dot"></div><div class="cw-dot"></div> 分析中...</div>'
    );

    let toolBlocks = [];
    streamDiv = null;
    abortController = new AbortController();

    let fullMsg = msg;
    if (currentContext) {
      fullMsg = currentContext + "\n" + msg;
    }

    const formData = new FormData();
    formData.append("q", fullMsg);
    formData.append("sid", sessionId);

    doSend(formData, loadDiv, toolBlocks);
  }

  // ── 核心逻辑 ──
  async function send() {
    const q = input.value.trim();
    if ((!q && !currentImage) || loading) return;
    setLoading(true);
    input.value = "";

    // 构建用户消息文本
    let displayMsg = q;
    if (currentImage) {
      const imgTag = '<img src="' + URL.createObjectURL(currentImage) + '" style="max-width:120px;border-radius:8px;display:block;margin-bottom:6px;">';
      displayMsg = imgTag + (q || "帮我看看这道题");
    }
    addMsg("user", displayMsg);

    const loadDiv = addMsg(
      "system",
      '<div class="cw-loading"><div class="cw-dot"></div><div class="cw-dot"></div><div class="cw-dot"></div> 思考中...</div>'
    );

    let toolBlocks = [];
    streamDiv = null;
    abortController = new AbortController();

    // 构建 FormData
    const formData = new FormData();
    let fullQ = q || "";
    if (currentContext) {
      fullQ = "用户当前在浏览: " + currentContext + "\n\n问题: " + (q || "");
    }
    formData.append("q", fullQ);
    if (currentImage) formData.append("image", currentImage, "screenshot.png");
    formData.append("sid", sessionId);

    clearImage();
    await doSend(formData, loadDiv, toolBlocks);
  }

  async function doSend(formData, loadDiv, toolBlocks) {
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        body: formData,
        signal: abortController.signal,
      });
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const d = JSON.parse(line.slice(6));

            if (d.type === "token") {
              if (loadDiv.parentNode) loadDiv.remove();
              panel.classList.add("expanded");
              if (!streamDiv) {
                streamDiv = addMsg("agent", '<div class="cw-agent-label">Amos</div>');
                streamDiv._text = "";
              }
              streamDiv._text += d.text;
              // 流式渲染: 用 sanitizeAI 保留 LaTeX 但不解析 (等 done 时统一 KaTeX)
              streamDiv.innerHTML = '<div class="cw-agent-label">Amos</div>' + sanitizeAI(streamDiv._text);
              messages.scrollTop = messages.scrollHeight;
            } else if (d.type === "tool_call") {
              const b = addToolBlock(d.tool, d.args);
              toolBlocks.push(b);
            } else if (d.type === "tool_result") {
              if (toolBlocks.length) {
                toolBlocks[toolBlocks.length - 1].querySelector(
                  ".result"
                ).textContent = d.result;
              }
            } else if (d.type === "done") {
              if (loadDiv.parentNode) loadDiv.remove();
              if (!streamDiv) {
                const contentHtml = renderMarkdown(d.summary);
                const d2 = addMsg(
                  "agent",
                  '<div class="cw-agent-label">Amos</div><div class="cw-msg-content">' + contentHtml + '</div><div class="cw-token-count">Token: ' + d.tokens.toLocaleString() + '</div>'
                );
                renderMath(d2);
                addFeedbackButtons(d2);
              } else {
                // 流式结束: 用 markdown 渲染替换纯文本
                const contentHtml = renderMarkdown(streamDiv._text);
                streamDiv.innerHTML = '<div class="cw-agent-label">Amos</div><div class="cw-msg-content">' + contentHtml + '</div><div class="cw-token-count">Token: ' + d.tokens.toLocaleString() + '</div>';
                renderMath(streamDiv);
                addFeedbackButtons(streamDiv);
              }
            } else if (d.type === "error") {
              if (loadDiv.parentNode) loadDiv.remove();
              addMsg("system", "❌ " + escHtml(d.text));
            }
          } catch (e) {}
        }
      }
    } catch (e) {
      if (e.name === "AbortError") return;
      if (loadDiv.parentNode) loadDiv.remove();
      addMsg("system", "❌ 连接失败: " + escHtml(e.message));
    }

    setLoading(false);
    abortController = null;
  }

  // ── 对外 API ──
  window.AmosChat = {
    setContext: function (ctx) {
      currentContext = ctx;
      if (ctx) {
        contextBadge.textContent = "📄 " + ctx;
        contextBadge.style.display = "block";
      } else {
        contextBadge.style.display = "none";
        currentContext = null;
      }
    },
    open: function () {
      panel.classList.add("open");
      btn.parentElement.classList.add("open");
      input.focus();
    },
  };
})();
