const restrictionMessage = "Access Denied";
let isInternalAction = false;

// Helper to get master config from window.French_MASTER_CONFIG
function getConfig() {
    return window.French_MASTER_CONFIG || window.CV_MASTER_CONFIG || window.MASTER_CONFIG || {};
}

// Inject Indentation and Layout Styles
const style = document.createElement('style');
style.innerHTML = `
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
`;
document.head.appendChild(style);

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
    const themeText = document.getElementById('theme-toggle-text');
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    if (themeBtn) {
        if (currentTheme === "dark") {
            themeBtn.style.backgroundImage = "url('../images/lightbulb.jpeg?v=2026')";
        } else {
            themeBtn.style.backgroundImage = "url('../images/darkbulb.jpeg?v=2026')";
        }
    }
    if (themeText) {
        themeText.textContent = currentTheme === "dark" ? "Light Mode" : "Dark Mode";
    }
}

function toggleTheme() {
    const body = document.body;
    const html = document.documentElement;
    const currentTheme = body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    body.setAttribute("data-theme", newTheme);
    html.setAttribute("data-theme", newTheme);
    
    updateThemeButton();
}

function downloadPDF() {
    isInternalAction = true;
    window.print();
    setTimeout(() => {
        isInternalAction = false;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    applyMasterConfig();
    
    const config = getConfig();
    const switcher = document.querySelector('.cv-container .theme-switcher') || document.querySelector('.theme-switcher');
    
    if (switcher) {
        switcher.style.position = 'absolute';
        switcher.style.top = '15px';
        switcher.style.right = '15px';
        switcher.style.margin = '0';
        switcher.style.textAlign = 'right';
        switcher.style.zIndex = '100';
        switcher.innerHTML = '';

        if (!document.body.hasAttribute("data-theme")) {
            document.body.setAttribute("data-theme", "light");
            document.documentElement.setAttribute("data-theme", "light");
        }

       /* // Create Vertical Ellipsis Wrapper & Trigger
        const menuWrapper = document.createElement('div');
        menuWrapper.className = 'ellipsis-menu-wrapper';

        const triggerBtn = document.createElement('button');
        triggerBtn.type = 'button';
        triggerBtn.id = 'global-ellipsis-btn';
        triggerBtn.className = 'ellipsis-trigger-btn';
        triggerBtn.title = 'Main Menu';
        triggerBtn.setAttribute('aria-label', 'Main Menu');
        triggerBtn.innerHTML = '&#9776;';

        const dropdownPanel = document.createElement('div');
        dropdownPanel.id = 'global-ellipsis-dropdown';
        dropdownPanel.className = 'ellipsis-dropdown-panel';

        triggerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownPanel.classList.toggle('open');
        });

        dropdownPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function() {
            dropdownPanel.classList.remove('open');
        });

        const iconStyle = (el) => {
            el.style.width = '22px';
            el.style.height = '22px';
            el.style.display = 'inline-block';
            el.style.flexShrink = '0';
            el.style.backgroundSize = '22px 2px';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundPosition = 'center';
        };
    */

        // Create Vertical Ellipsis Wrapper & Trigger
        const menuWrapper = document.createElement('div');
        menuWrapper.className = 'ellipsis-menu-wrapper';

        const triggerBtn = document.createElement('button');
        triggerBtn.type = 'button';
        triggerBtn.id = 'global-ellipsis-btn';
        triggerBtn.className = 'ellipsis-trigger-btn';
        triggerBtn.title = 'Main Menu';
        triggerBtn.setAttribute('aria-label', 'Main Menu');

        // Create and style the menu.png image
        const menuImg = document.createElement('img');
        menuImg.src = '../images/menu.png'; // Change this if menu.png is inside a folder (e.g., 'images/menu.png')
        menuImg.alt = 'Menu';
        menuImg.style.width = '32px';   // Adjust size here (e.g., 28px, 32px, 40px)
        menuImg.style.height = '32px';
        menuImg.style.display = 'block';
        menuImg.style.objectFit = 'contain';

        triggerBtn.appendChild(menuImg);

        const dropdownPanel = document.createElement('div');
        dropdownPanel.id = 'global-ellipsis-dropdown';
        dropdownPanel.className = 'ellipsis-dropdown-panel';

        triggerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownPanel.classList.toggle('open');
        });

        dropdownPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function() {
            dropdownPanel.classList.remove('open');
        });

        const iconStyle = (el) => {
            el.style.width = '22px';
            el.style.height = '22px';
            el.style.display = 'inline-block';
            el.style.flexShrink = '0';
            el.style.backgroundSize = '22px 2px';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundPosition = 'center';
        };

        // 1. Homepage Option
        const homeRow = document.createElement('div');
        homeRow.className = 'ellipsis-menu-row';
        const homeUrl = config.homePage || 'language.html';
        const homeLink = document.createElement('a');
        homeLink.href = homeUrl;
        homeLink.className = 'ellipsis-menu-link';
        homeLink.title = 'Return to Language Hub';

        const homeImg = document.createElement('img');
        homeImg.src = '../images/homepage.png';
        homeImg.alt = 'Home';
        iconStyle(homeImg);

        const homeLabel = document.createElement('span');
        homeLabel.textContent = 'Homepage';

        homeLink.appendChild(homeImg);
        homeLink.appendChild(homeLabel);
        homeRow.appendChild(homeLink);
        dropdownPanel.appendChild(homeRow);

        // 2. Download PDF Option
        if (config.showDownloadIcon === true) {
            const dlRow = document.createElement('div');
            dlRow.className = 'ellipsis-menu-row';
            const downloadBtn = document.createElement('button');
            downloadBtn.type = 'button';
            downloadBtn.id = 'download-pdf-btn';
            downloadBtn.className = 'ellipsis-menu-link';
            downloadBtn.onclick = function() {
                dropdownPanel.classList.remove('open');
                downloadPDF();
            };
            downloadBtn.title = "Download PDF";

            const dlIcon = document.createElement('span');
            iconStyle(dlIcon);
            dlIcon.style.backgroundImage = "url('../images/download.jpeg?v=2026')";

            const dlLabel = document.createElement('span');
            dlLabel.textContent = 'Download PDF';

            downloadBtn.appendChild(dlIcon);
            downloadBtn.appendChild(dlLabel);
            dlRow.appendChild(downloadBtn);
            dropdownPanel.appendChild(dlRow);
        }

        // 3. Theme Selector Option
        if (config.showThemeIcon !== false) {
            const themeRow = document.createElement('div');
            themeRow.className = 'ellipsis-menu-row';
            const themeActionBtn = document.createElement('button');
            themeActionBtn.type = 'button';
            themeActionBtn.className = 'ellipsis-menu-link';
            themeActionBtn.onclick = toggleTheme;
            themeActionBtn.title = "Toggle Theme";

            const themeBtn = document.createElement('span');
            themeBtn.id = 'theme-toggle-btn';
            iconStyle(themeBtn);

            const themeText = document.createElement('span');
            themeText.id = 'theme-toggle-text';
            themeText.textContent = 'Dark Mode';

            themeActionBtn.appendChild(themeBtn);
            themeActionBtn.appendChild(themeText);
            themeRow.appendChild(themeActionBtn);
            dropdownPanel.appendChild(themeRow);
            updateThemeButton();
        }

        // 4. Voice Selection Option
        const voiceRow = document.createElement('div');
        voiceRow.className = 'ellipsis-menu-row';
        voiceRow.style.flexDirection = 'column';
        voiceRow.style.alignItems = 'stretch';
        voiceRow.style.gap = '4px';
        voiceRow.innerHTML = `
            <label for="global-voice-select" style="font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Select Voice:</label>
            <select id="global-voice-select" onchange="handleVoiceChange(this)" style="font-size: 9pt; padding: 5px 8px; border-radius: 4px; border: 1px solid var(--border-color, #dee2e6); background: var(--container-bg, var(--card-bg, #ffffff)); color: var(--text-color, #212529); width: 100%;" title="Select French Voice">
                <option value="">Default Voice</option>
            </select>
        `;
        dropdownPanel.appendChild(voiceRow);

        // 5. Speed Selection Option
        const speedRow = document.createElement('div');
        speedRow.className = 'ellipsis-menu-row';
        speedRow.style.flexDirection = 'column';
        speedRow.style.alignItems = 'stretch';
        speedRow.style.gap = '6px';
        speedRow.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Playback Speed:</span>
                <span id="speed-label" style="font-size: 8.5pt; font-weight: 700; background: var(--container-bg, var(--card-bg, #ffffff)); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border-color, #dee2e6); min-width: 18px; text-align: center; color: #2e7d32;" title="Normal">N</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <button type="button" onclick="adjustAudioSpeed(-1)" style="background: transparent; border: 1px solid var(--border-color, #dee2e6); color: var(--text-color, #212529); border-radius: 3px; width: 26px; height: 26px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 11pt;" title="Slower (-)">-</button>
                <input type="range" id="audio-speed-slider" class="custom-slider" style="flex: 1;" min="0" max="2" step="1" value="1" oninput="handleAudioSpeedSlider(this)" title="Audio Speed">
                <button type="button" onclick="adjustAudioSpeed(1)" style="background: transparent; border: 1px solid var(--border-color, #dee2e6); color: var(--text-color, #212529); border-radius: 3px; width: 26px; height: 26px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 11pt;" title="Faster (+)">+</button>
            </div>
        `;
        dropdownPanel.appendChild(speedRow);

        menuWrapper.appendChild(triggerBtn);
        menuWrapper.appendChild(dropdownPanel);
        switcher.appendChild(menuWrapper);

        if (typeof updateSpeedUI === 'function') {
            updateSpeedUI(window.currentAudioSpeedIndex || 1);
        }
        if (typeof window.populateVoices === 'function') {
            setTimeout(window.populateVoices, 100);
        }
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