// ========== GLOBAL CONFIGURATION & SECURITY HELPERS ==========
const restrictionMessage = "Access Denied";
let isInternalAction = false;

function getConfig() {
    return window.French_MASTER_CONFIG || window.CV_MASTER_CONFIG || window.MASTER_CONFIG || {};
}

// ========== GLOBAL HEADER & FOOTER TEMPLATES ==========
const siteHeaderHTML = `
    <style>
        .custom-slider {
            -webkit-appearance: none;
            width: 70px;
            height: 6px;
            border-radius: 3px;
            outline: none;
            background: #2e7d32; /* Default Center Green */
            transition: background 0.2s;
        }
        .custom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #ffffff;
            border: 2px solid #555;
            cursor: pointer;
        }
        .custom-slider::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #ffffff;
            border: 2px solid #555;
            cursor: pointer;
        }
    </style>
    <div class="site-header-inner" style="margin-bottom: 12pt; position: relative;">
        <!-- Top absolute row for home, theme, and download icons to prevent collisions -->
        <div style="position: absolute; top: 0; right: 0; z-index: 5;"></div>

        <div style="display: flex; align-items: center; gap: 15px;">
            <img src="../images/logo1.png" alt="Logo" style="width: 50px; height: 50px; object-fit: contain; border-radius: 4px;">
            <div style="width: 100%; padding-right: 120px;">
                <h1 style="margin: 0; font-size: 20pt; text-align: left; text-transform: uppercase;">Apprenons le français (Let's Learn French Language)</h1>
                
                <!-- Subtitle row with voice and speed controls aligned to the exact right -->
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-top: 2px; width: 100%;">
                    <p style="margin: 0; color: var(--muted-color); font-size: 9.5pt;">Master French (Basic to B2 levels) conversation, grammar, and fluency step-by-step.</p>
                    
                    <div id="top-speed-control-panel" style="display: flex; align-items: center; gap: 6px; background: var(--card-bg, #ffffff); padding: 4px 8px; border-radius: 6px; border: 1px solid var(--border-color, #dee2e6); box-shadow: 0 1px 3px rgba(0,0,0,0.05); white-space: nowrap;">
                        <span style="font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">VOICE:</span>
                        <select id="global-voice-select" onchange="handleVoiceChange(this)" style="font-size: 8pt; padding: 2px 4px; border-radius: 4px; border: 1px solid var(--border-color, #dee2e6); background: var(--card-bg, #ffffff); color: var(--text-color, #212529); max-width: 120px;" title="Select French Voice">
                            <option value="">Default Voice</option>
                        </select>

                        <span style="font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 4px;">SPEED:</span>
                        <button onclick="adjustAudioSpeed(-1)" style="background: transparent; border: 1px solid var(--border-color, #dee2e6); border-radius: 3px; width: 18px; height: 18px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 9pt;" title="Slower (-)">-</button>
                        <input type="range" id="audio-speed-slider" class="custom-slider" min="0" max="2" step="1" value="1" oninput="handleAudioSpeedSlider(this)" title="Audio Speed">
                        <button onclick="adjustAudioSpeed(1)" style="background: transparent; border: 1px solid var(--border-color, #dee2e6); border-radius: 3px; width: 18px; height: 18px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 9pt;" title="Faster (+)">+</button>
                        <span id="speed-label" style="font-size: 8pt; font-weight: 700; background: var(--card-bg, #ffffff); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-color, #dee2e6); min-width: 14px; text-align: center; color: #2e7d32;" title="Normal">N</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr>
`;

const siteFooterHTML = `
    <hr style="margin: 20px 0 10px 0;">
    <div style="text-align: center; color: var(--muted-color); font-size: 8.5pt; padding: 5px 0;">
        &copy; 2026 French Learning Workspace. All rights reserved. | <a href="../../home.html" style="color: var(--primary-color); text-decoration: none;">Home</a>
    </div>
`;

// ========== INJECT GLOBAL LAYOUT, TOOLBAR & FLOATING NAV STYLES ==========
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
    /* Two-column layout for Resources */
    .resources-grid {
        display: flex;
        gap: 20px;
        margin-top: 8pt;
        margin-bottom: 8pt;
    }
    .resources-column {
        flex: 1;
    }
    @media (max-width: 600px) {
        .resources-grid {
            flex-direction: column;
            gap: 10px;
        }
    }
    /* Indentation styling for vocabulary content blocks */
    .vocab-content {
        margin-left: 30px;
        margin-bottom: 15px;
    }
    .cv-container ul {
        padding-left: 20px;
    }
    .cv-container li {
        margin-bottom: 3pt;
    }
    /* Home Icon Link Styling */
    .home-icon-link {
        text-decoration: none;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        line-height: 24px;
        font-size: 18px;
        transition: transform 0.2s ease;
    }
    .home-icon-link:hover {
        transform: scale(1.1);
    }
    /* Floating Top / Bottom Navigation Buttons */
    #floating-nav-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
    }
    #floating-nav-container button {
        background: var(--primary-color, #0055A5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
    }
    #floating-nav-container button:hover {
        transform: scale(1.1);
    }
    .nav-btn-hidden {
        display: none !important;
    }
`;
document.head.appendChild(globalStyle);

// ========== AUDIO SPEED & VOICE SELECTION ENGINE ==========
const speedMapValues = { 0: 0.6, 1: 1.0, 2: 1.6 };
const speedMapLabels = { 0: 'S', 1: 'N', 2: 'F' };
const speedMapTooltips = { 0: 'Slow', 1: 'Normal', 2: 'Fast' };
const speedMapColors = { 0: '#ef6c00', 1: '#2e7d32', 2: '#c62828' };

window.currentAudioSpeedIndex = 1;
window.currentAudioSpeed = speedMapValues[1];
window.selectedFrenchVoiceURI = localStorage.getItem('preferred_french_voice') || '';

function updateSpeedUI(idx) {
    window.currentAudioSpeedIndex = idx;
    window.currentAudioSpeed = speedMapValues[idx];
    
    const sliderEl = document.getElementById('audio-speed-slider');
    const labelEl = document.getElementById('speed-label');
    
    if (sliderEl) {
        sliderEl.value = idx;
        sliderEl.style.background = speedMapColors[idx];
    }
    if (labelEl) {
        labelEl.textContent = speedMapLabels[idx];
        labelEl.title = speedMapTooltips[idx];
        labelEl.style.color = speedMapColors[idx];
    }
}

window.handleAudioSpeedSlider = function(sliderElement) {
    updateSpeedUI(parseInt(sliderElement.value));
};

window.adjustAudioSpeed = function(direction) {
    let newIdx = window.currentAudioSpeedIndex + direction;
    if (newIdx < 0) newIdx = 0;
    if (newIdx > 2) newIdx = 2;
    updateSpeedUI(newIdx);
};

function populateVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('global-voice-select');
    
    if (!voiceSelect) return;
    
    const frenchVoices = voices.filter(v => v.lang.startsWith('fr'));
    voiceSelect.innerHTML = '<option value="">Default Voice</option>';
    
    frenchVoices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.voiceURI;
        option.textContent = `${voice.name} (${voice.lang})`;
        if (voice.voiceURI === window.selectedFrenchVoiceURI) {
            option.selected = true;
        }
        voiceSelect.appendChild(option);
    });
}

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
}

window.handleVoiceChange = function(selectElement) {
    window.selectedFrenchVoiceURI = selectElement.value;
    localStorage.setItem('preferred_french_voice', window.selectedFrenchVoiceURI);
};

window.playAudio = function(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = Number(window.currentAudioSpeed) || 1.0;
        
        if (window.selectedFrenchVoiceURI) {
            const voices = window.speechSynthesis.getVoices();
            const chosenVoice = voices.find(v => v.voiceURI === window.selectedFrenchVoiceURI);
            if (chosenVoice) {
                utterance.voice = chosenVoice;
            }
        }
        
        window.speechSynthesis.speak(utterance);
        window._lastUtterance = utterance;
    } else {
        alert('Speech synthesis is not supported in your browser.');
    }
};

// ========== MASTER CONFIG, THEME & TOOLBAR FUNCTIONS ==========
function applyMasterConfig() {
    const config = getConfig();
    
    if (config.profileImage) {
        const profileImgs = document.querySelectorAll('.profile-img');
        profileImgs.forEach(img => {
            img.src = config.profileImage;
        });
    }

    if (config.allowLeftClick === false) {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
    } else {
        document.body.style.userSelect = 'auto';
        document.body.style.webkitUserSelect = 'auto';
    }
}

function updateThemeButton() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        const currentTheme = document.body.getAttribute("data-theme") || "light";
        if (currentTheme === "dark") {
            themeBtn.style.backgroundImage = "url('../images/lightbulb.jpeg?v=2026')";
        } else {
            themeBtn.style.backgroundImage = "url('../images/darkbulb.jpeg?v=2026')";
        }
    }
}

function toggleTheme() {
    const body = document.body;
    const html = document.documentElement;
    const currentTheme = body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    body.setAttribute("data-theme", newTheme);
    html.setAttribute("data-theme", newTheme);
    
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.style.backgroundImage = 'none';
    }
    
    void body.offsetHeight;
    setTimeout(() => {
        updateThemeButton();
    }, 50);
}

function downloadPDF() {
    isInternalAction = true;
    window.print();
    setTimeout(() => {
        isInternalAction = false;
    }, 1000);
}

// ========== FLOATING SCROLL NAVIGATION ==========
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.scrollToBottom = function() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

window.addEventListener('scroll', () => {
    const topBtn = document.getElementById('float-top-btn');
    if (topBtn) {
        if (window.scrollY > 100) {
            topBtn.classList.remove('nav-btn-hidden');
        } else {
            topBtn.classList.add('nav-btn-hidden');
        }
    }
});

// ========== UNIFIED DOM INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", function () {
    // 1. Inject Header & Footer
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    if (headerContainer) headerContainer.innerHTML = siteHeaderHTML;
    if (footerContainer) footerContainer.innerHTML = siteFooterHTML;

    // 2. Initialize Speed & Voice Controls
    updateSpeedUI(window.currentAudioSpeedIndex);
    setTimeout(populateVoices, 100);

    // 3. Apply Master Configuration
    applyMasterConfig();

    // 4. Render Top-Right Toolbar (Home, Theme, Download PDF)
    const config = getConfig();
    const switcher = document.querySelector('.cv-container .theme-switcher') || document.querySelector('.theme-switcher');
    
    if (switcher) {
        switcher.style.position = 'absolute';
        switcher.style.top = '15px';
        switcher.style.right = '15px';
        switcher.style.margin = '0';
        switcher.style.textAlign = 'right';
        switcher.style.zIndex = '10';
        switcher.innerHTML = '';
        
        const baseButtonStyle = (btn) => {
            btn.type = 'button';
            btn.style.backgroundSize = '20px 20px';
            btn.style.backgroundRepeat = 'no-repeat';
            btn.style.backgroundPosition = 'center';
            btn.style.backgroundColor = 'transparent';
            btn.style.border = 'none';
            btn.style.outline = 'none';
            btn.style.boxShadow = 'none';
            btn.style.cursor = 'pointer';
            btn.style.width = '24px';
            btn.style.height = '24px';
            btn.style.padding = '0';
            btn.style.margin = '0 4px';
            btn.style.display = 'inline-block';
            btn.style.verticalAlign = 'middle';
        };

        if (!document.body.hasAttribute("data-theme")) {
            document.body.setAttribute("data-theme", "light");
            document.documentElement.setAttribute("data-theme", "light");
        }

        // Home Icon Button
        const homeUrl = config.homePage || 'language.html';
        const homeLink = document.createElement('a');
        homeLink.href = homeUrl;
        homeLink.className = 'home-icon-link';
        homeLink.title = 'Return to Language Hub';
        homeLink.innerHTML = '🏠';
        baseButtonStyle(homeLink);
        switcher.appendChild(homeLink);

        // Theme Toggle Button
        if (config.showThemeIcon !== false) {
            const themeBtn = document.createElement('button');
            themeBtn.id = 'theme-toggle-btn';
            baseButtonStyle(themeBtn);
            themeBtn.onclick = toggleTheme;
            themeBtn.title = "Toggle Theme";
            switcher.appendChild(themeBtn);
            updateThemeButton();
        }
        
        // Download PDF Button
        if (config.showDownloadIcon === true) {
            const downloadBtn = document.createElement('button');
            downloadBtn.id = 'download-pdf-btn';
            baseButtonStyle(downloadBtn);
            downloadBtn.onclick = downloadPDF;
            downloadBtn.title = "Download PDF";
            downloadBtn.style.backgroundImage = "url('../images/download.jpeg?v=2026')";
            switcher.appendChild(downloadBtn);
        }
    }

    // 5. Inject Floating Top / Bottom Navigation Buttons
    if (!document.getElementById('floating-nav-container')) {
        const floatNavDiv = document.createElement('div');
        floatNavDiv.id = 'floating-nav-container';
        floatNavDiv.innerHTML = `
            <button id="float-top-btn" class="nav-btn-hidden" title="Go to Top" onclick="scrollToTop()">⬆️</button>
            <button id="float-bottom-btn" title="Go to Bottom" onclick="scrollToBottom()">⬇️</button>
        `;
        document.body.appendChild(floatNavDiv);
    }
});

// ========== SECURITY & RESTRICTIONS ==========
document.addEventListener('contextmenu', function(e) {
    const config = getConfig();
    if (!config.allowRightClick) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});

document.addEventListener('copy', function(e) {
    const config = getConfig();
    if (!config.allowRightClick) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});

document.addEventListener('cut', function(e) {
    const config = getConfig();
    if (!config.allowRightClick) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});

document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    const config = getConfig();
    if (isInternalAction) return;
    if (config.allowScreenshot) return;

    if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'u' || e.key === 'P' || e.key === 'S' || e.key === 'U')) {
        e.preventDefault();
        alert(restrictionMessage);
    }
    
    if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        navigator.clipboard.writeText('');
        alert(restrictionMessage);
    }

    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});
