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
            <img src="../Images/logo1.png
            " alt="Logo" style="width: 50px; height: 50px; object-fit: contain; border-radius: 4px;">
            <div style="width: 100%; padding-right: 120px;">
                <h1 style="margin: 0; font-size: 20pt; text-align: left; text-transform: uppercase;">Apprenons le français (Let's Learn French Language)</h1>
                
                <!-- Subtitle row with slider aligned to the exact right -->
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-top: 2px; width: 100%;">
                    <p style="margin: 0; color: var(--muted-color); font-size: 9.5pt;">Master French (Basic to B2 levels) conversation, grammar, and fluency step-by-step.</p>
                    
                    <div id="top-speed-control-panel" style="display: flex; align-items: center; gap: 6px; background: var(--card-bg, #ffffff); padding: 4px 8px; border-radius: 6px; border: 1px solid var(--border-color, #dee2e6); box-shadow: 0 1px 3px rgba(0,0,0,0.05); white-space: nowrap;">
                        <span style="font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">SPEED:</span>
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
        &copy; 2026 French Learning Workspace. All rights reserved. | <a href="../../Home.html" style="color: var(--primary-color); text-decoration: none;">Home</a>
    </div>
`;

// Speed mapping: 0 = Slow (0.6), 1 = Normal (1.0), 2 = Fast (1.6)
const speedMapValues = { 0: 0.6, 1: 1.0, 2: 1.6 };
const speedMapLabels = { 0: 'S', 1: 'N', 2: 'F' };
const speedMapTooltips = { 0: 'Slow', 1: 'Normal', 2: 'Fast' };
const speedMapColors = { 0: '#ef6c00', 1: '#2e7d32', 2: '#c62828' }; // Orange for Slow, Green for Normal, Red for Fast

// Initialize global speech speed (Default 1.0 -> slider index 1)
window.currentAudioSpeedIndex = 1;
window.currentAudioSpeed = speedMapValues[1];

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

// Handle slider change event
window.handleAudioSpeedSlider = function(sliderElement) {
    updateSpeedUI(parseInt(sliderElement.value));
};

// Handle [-] and [+] button clicks
window.adjustAudioSpeed = function(direction) {
    let newIdx = window.currentAudioSpeedIndex + direction;
    if (newIdx < 0) newIdx = 0;
    if (newIdx > 2) newIdx = 2;
    updateSpeedUI(newIdx);
};

// Global playAudio function with immediate cancel and forced rate assignment
window.playAudio = function(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Flush queue immediately
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = Number(window.currentAudioSpeed) || 1.0;
        
        window.speechSynthesis.speak(utterance);
        window._lastUtterance = utterance;
    } else {
        alert('Speech synthesis is not supported in your browser.');
    }
};

document.addEventListener("DOMContentLoaded", function () 
{
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    if (headerContainer) headerContainer.innerHTML = siteHeaderHTML;
    if (footerContainer) footerContainer.innerHTML = siteFooterHTML;

    // Sync slider and label on page load
    updateSpeedUI(window.currentAudioSpeedIndex);
});



// Dynamic Floating Top & Bottom Navigation
function initFloatingNav() {
    // Check master config flag
    if (window.MASTER_CONFIG && window.MASTER_CONFIG.ENABLE_FLOATING_NAV === false) {
        return;
    }

    if (document.getElementById('floating-nav-container')) return;

    // Create container and buttons
    const navContainer = document.createElement('div');
    navContainer.id = 'floating-nav-container';
    navContainer.innerHTML = `
        <button id="float-top-btn" class="nav-btn-hidden" title="Go to Top" onclick="scrollToTop()">
            <img src="../Images/Top.png" alt="Top" onerror="this.style.display='none'">
        </button>
        <button id="float-bottom-btn" title="Go to Bottom" onclick="scrollToBottom()">
            <img src="../Images/Bottom.png" alt="Bottom" onerror="this.style.display='none'">
        </button>
    `;
    document.body.appendChild(navContainer);

    
    // Inject CSS styles
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
            // background-color: var(--primary-color, #2563eb);
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
            //background-color: var(--primary-hover, #1d4ed8);
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

    // Scroll Visibility Logic
    const topBtn = document.getElementById('float-top-btn');
    const bottomBtn = document.getElementById('float-bottom-btn');

    function updateNavVisibility() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // If page has no scrollable area, show bottom and hide top
        if (scrollHeight <= 0) {
            topBtn.classList.add('nav-btn-hidden');
            bottomBtn.classList.remove('nav-btn-hidden');
            return;
        }

        const scrollPercent = (scrollTop / scrollHeight) * 100;

        // Show TOP button only after scrolling past 15%
        if (scrollPercent >= 15) {
            topBtn.classList.remove('nav-btn-hidden');
        } else {
            topBtn.classList.add('nav-btn-hidden');
        }

        // Hide BOTTOM button when near the end (85%+ scrolled)
        if (scrollPercent >= 85) {
            bottomBtn.classList.add('nav-btn-hidden');
        } else {
            bottomBtn.classList.remove('nav-btn-hidden');
        }
    }

    window.addEventListener('scroll', updateNavVisibility);
    window.addEventListener('resize', updateNavVisibility);
    
    // Run on load and after a brief timeout to ensure layout is fully rendered
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
    // Intercept clicks on internal anchor/bookmark links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stop the default URL hash change
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Smoothly scroll to the target element without altering the URL hash
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});