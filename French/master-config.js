// ==========================================
// MASTER CONFIGURATION FILE (FRENCH - A1B2)
// ==========================================
window.French_MASTER_CONFIG = {
    // 1. Security & Interaction Controls
    allowRightClick: true,      // false = Restricted (Default), true = Allowed
    allowLeftClick: true,       // true = Normal clicks, false = Blocks selection/clicks
    allowScreenshot: true,      // false = Blocks PrintScreen/shortcuts, true = Allowed
    
    // 2. Toolbar Icon Controls
    showDownloadIcon: true,      // true = Show PDF download icon, false = Hidden
    showThemeIcon: true,         // true = Show Theme toggle icon, false = Hidden
    
    // 3. Profile Image Setting (Points to root asset)
    profileImage: "../me.jpeg",     

    // 4. Fixed homepage (Points to root home.html)
    homePage: "../Home.html", 

    // 5. Favicon Setting (Local subfolder asset)
    favicon: "../logo1.png"         
};

// ==========================================
// AUTOMATIC FAVICON INJECTOR
// ==========================================
(function() {
    if (window.French_MASTER_CONFIG && window.French_MASTER_CONFIG.favicon) {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = window.French_MASTER_CONFIG.favicon;
        if (!link.parentNode) {
            document.head.appendChild(link);
        }
    }
})();

// ==========================================
// GLOBAL ACCORDION BUILDER FUNCTION
// ==========================================
window.initAccordions = function(containerSelector = '.resources-column') {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const h3Elements = container.querySelectorAll('h3');
    h3Elements.forEach(h3 => {
        const nextUl = h3.nextElementSibling;
        if (nextUl && nextUl.tagName === 'UL') {
            const details = document.createElement('details');
            details.className = 'accordion-section';
            
            const summary = document.createElement('summary');
            summary.className = 'accordion-summary';
            
            summary.appendChild(h3.cloneNode(true));
            
            h3.parentNode.insertBefore(details, h3);
            details.appendChild(summary);
            details.appendChild(nextUl);
            
            h3.remove();
        }
    });
};

// Automatically run accordion initialization on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.initAccordions('.resources-column');
});