const siteHeaderHTML = `
    <style>
        .custom-slider {
            -webkit-appearance: none;
            width: 110px;
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
        .ellipsis-menu-wrapper {
            position: relative;
            display: inline-block;
        }
        .ellipsis-trigger-btn {
            background: transparent;
            border: 1px solid var(--border-color, #dee2e6);
            color: var(--text-color, #212529);
            border-radius: 6px;
            width: 36px;
            height: 36px;
            font-size: 20px;
            font-weight: bold;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s, border-color 0.2s;
        }
        .ellipsis-trigger-btn:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
        [data-theme="dark"] .ellipsis-trigger-btn:hover {
            background-color: rgba(255, 255, 255, 0.08);
        }
        .ellipsis-dropdown-panel {
            display: none;
            position: absolute;
            top: 42px;
            right: 0;
            min-width: 275px;
            background: var(--container-bg, var(--card-bg, #ffffff));
            color: var(--text-color, #212529);
            border: 1px solid var(--border-color, #dee2e6);
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
            padding: 12px 14px;
            z-index: 1000;
            text-align: left;
        }
        .ellipsis-dropdown-panel.open {
            display: block;
        }
        .ellipsis-menu-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 9px 6px;
            border-bottom: 1px solid var(--border-color, #dee2e6);
            font-size: 9pt;
        }
        .ellipsis-menu-row:last-child {
            border-bottom: none;
        }
        .ellipsis-menu-link {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            background: transparent;
            border: none;
            padding: 0;
            color: var(--text-color, #212529);
            text-decoration: none;
            font-size: 9.5pt;
            font-weight: 600;
            cursor: pointer;
            text-align: left;
        }
        .ellipsis-menu-link:hover {
            color: var(--primary-color, #0055A5);
        }
    </style>
    <div class="site-header-inner" style="margin-bottom: 12pt; position: relative;">
        <div style="display: flex; align-items: center; gap: 15px;">
            <img src="../images/logo1.png" alt="Logo" style="width: 50px; height: 50px; object-fit: contain; border-radius: 4px;">
            <div style="width: 100%; padding-right: 45px;">
                <h1 style="margin: 0; font-size: 20pt; text-align: left; text-transform: uppercase;">IELTS EXAM PREPARATION</h1>
                
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-top: 2px; width: 100%;">
                    <p style="margin: 0; color: var(--muted-color); font-size: 9.5pt;">Master each module of IELTS exam including grammar.</p>
                </div>
            </div>
        </div>
    </div>
    <hr>
`;

const siteFooterHTML = `
    <hr style="margin: 20px 0 10px 0;">
    <div style="text-align: center; color: var(--muted-color); font-size: 8.5pt; padding: 5px 0;">
        &copy; 2026 French Learning Workspace. All rights reserved. | <a href="../../main/home.html" style="color: var(--primary-color); text-decoration: none;">Home</a>
    </div>
`;

// Speed mapping: 0 = Slow (0.6), 1 = Normal (1.0), 2 = Fast (1.6)
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

window.populateVoices = function() {
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
};

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = window.populateVoices;
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

document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    if (headerContainer) headerContainer.innerHTML = siteHeaderHTML;
    if (footerContainer) footerContainer.innerHTML = siteFooterHTML;

    updateSpeedUI(window.currentAudioSpeedIndex);
    setTimeout(window.populateVoices, 100);
});

// Dynamic Floating Top & Bottom Navigation
function initFloatingNav() {
    if (window.MASTER_CONFIG && window.MASTER_CONFIG.ENABLE_FLOATING_NAV === false) {
        return;
    }

    if (document.getElementById('floating-nav-container')) return;

    const navContainer = document.createElement('div');
    navContainer.id = 'floating-nav-container';
    navContainer.innerHTML = `
        <button id="float-top-btn" class="nav-btn-hidden" title="Go to Top" onclick="scrollToTop()">
            <img src="../images/top.png" alt="Top" onerror="this.style.display='none'">
        </button>
        <button id="float-bottom-btn" title="Go to Bottom" onclick="scrollToBottom()">
            <img src="../images/bottom.png" alt="Bottom" onerror="this.style.display='none'">
        </button>
    `;
    document.body.appendChild(navContainer);

    const style = document.createElement('style');
    style.innerHTML = `
        #floating-nav-container {
            position: fixed;
            bottom: 25px;
            right: 25px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 9999;
        }

        #floating-nav-container button {
            background-color: #e6dada7e;
            border: none;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
            opacity: 1;
            visibility: visible;
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.2s, background-color 0.2s;
            padding: 0;
            overflow: hidden;
        }

        #floating-nav-container button img {
            width: 22px;
            height: 22px;
            object-fit: contain;
            pointer-events: none;
        }

        #floating-nav-container button:hover {
            background-color: #f5f6ec;
            transform: scale(1.08);
        }

        #floating-nav-container button.nav-btn-hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    const topBtn = document.getElementById('float-top-btn');
    const bottomBtn = document.getElementById('float-bottom-btn');

    function updateNavVisibility() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (scrollHeight <= 0) {
            topBtn.classList.add('nav-btn-hidden');
            bottomBtn.classList.remove('nav-btn-hidden');
            return;
        }

        const scrollPercent = (scrollTop / scrollHeight) * 100;

        if (scrollPercent >= 15) {
            topBtn.classList.remove('nav-btn-hidden');
        } else {
            topBtn.classList.add('nav-btn-hidden');
        }

        if (scrollPercent >= 85) {
            bottomBtn.classList.add('nav-btn-hidden');
        } else {
            bottomBtn.classList.remove('nav-btn-hidden');
        }
    }

    window.addEventListener('scroll', updateNavVisibility);
    window.addEventListener('resize', updateNavVisibility);
    
    updateNavVisibility();
    setTimeout(updateNavVisibility, 100);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', initFloatingNav);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});