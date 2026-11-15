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

// Populate voice dropdown options from browser speech engine
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

// Global playAudio function enhanced with voice selection
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
    setTimeout(populateVoices, 100);
}
);


