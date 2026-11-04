const siteHeaderHTML = `
    <div class="site-header-inner" style="display: flex; align-items: center; gap: 15px; margin-bottom: 12pt;">
        <img src="logo1.png" alt="Logo" style="width: 50px; height: 50px; object-fit: contain; border-radius: 4px;">
        <div>
            <h1 style="margin: 0; font-size: 20pt; text-align: left; text-transform: uppercase;">Apprenons le français (Let's Learn French Language)</h1>
            <p style="margin: 2px 0 0 0; color: var(--muted-color); font-size: 9.5pt;">Master French (Basic to B2 levels) conversation, grammar, and fluency step-by-step.</p>
        </div>
    </div>
    <hr>
`;

const siteFooterHTML = `
    <hr style="margin: 20px 0 10px 0;">
    <div style="text-align: center; color: var(--muted-color); font-size: 8.5pt; padding: 5px 0;">
        &copy; 2026 French Learning Workspace. All rights reserved. | <a href="../Home.html" style="color: var(--primary-color); text-decoration: none;">Home</a>
    </div>
`;

// Initialize global speech speed (Default 1.0)
window.currentAudioSpeed = (window.French_MASTER_CONFIG && window.French_MASTER_CONFIG.audioSpeed) || 1.0;

// Function to handle dropdown selection
window.handleAudioSpeedChange = function(selectElement) {
    window.currentAudioSpeed = parseFloat(selectElement.value);
};

// Global playAudio function with immediate cancel and forced rate assignment
window.playAudio = function(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Flush queue immediately
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = Number(window.currentAudioSpeed) || 1.0; // Apply active speed setting
        
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

    // Reposition page H1 and Speed Control in the exact same row
    const mainContentArea = document.querySelector('.main-content-area');
    if (mainContentArea) {
        const pageH1 = mainContentArea.querySelector('h1');
        
        if (pageH1 && !document.getElementById('top-speed-control-panel')) {
            // Create flex wrapper container
            const headerRowWrapper = document.createElement('div');
            headerRowWrapper.className = 'title-header-wrapper';
            headerRowWrapper.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; gap: 15px; flex-wrap: wrap;';

            // Create compact dropdown HTML
            const speedControlBox = document.createElement('div');
            speedControlBox.id = 'top-speed-control-panel';
            speedControlBox.innerHTML = `
                <div style="display: flex; align-items: center; gap: 6px; background: var(--card-bg, #ffffff); padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border-color, #dee2e6); box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <label for="audio-speed-select" style="font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">SPEED:</label>
                    <select id="audio-speed-select" onchange="handleAudioSpeedChange(this)" style="padding: 4px 8px; font-size: 8.5pt; cursor: pointer; border: 1px solid var(--border-color, #dee2e6); background: var(--card-bg, #ffffff); color: inherit; border-radius: 4px; outline: none; font-weight: 500;">
                        <option value="0.6">Slow</option>
                        <option value="1.0" selected>Normal</option>
                        <option value="1.6">Fast</option>
                    </select>
                </div>
            `;

            // Style H1 for alignment without extra margins
            pageH1.style.margin = '0';
            pageH1.style.textAlign = 'left';

            // Insert wrapper before H1, then append H1 and Speed box inside it
            pageH1.parentNode.insertBefore(headerRowWrapper, pageH1);
            headerRowWrapper.appendChild(pageH1);
            headerRowWrapper.appendChild(speedControlBox);
        }
    }

    // Sync dropdown with active speed
    const speedSelect = document.getElementById('audio-speed-select');
    if (speedSelect) {
        speedSelect.value = String(window.currentAudioSpeed);
    }
});