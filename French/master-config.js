// ==========================================
// MASTER CONFIGURATION FILE (FRENCH - A1B2)
// ==========================================
window.French_MASTER_CONFIG = {
    // 1. Security & Interaction Controls
    allowRightClick: false,      // false = Restricted (Default), true = Allowed
    allowLeftClick: false,       // true = Normal clicks, false = Blocks selection/clicks
    allowScreenshot: false,      // false = Blocks PrintScreen/shortcuts, true = Allowed
    
    // 2. Toolbar Icon Controls
    showDownloadIcon: true,      // true = Show PDF download icon, false = Hidden
    showThemeIcon: true,         // true = Show Theme toggle icon, false = Hidden
    
    // 3. Profile Image Setting (Points to root asset)
    profileImage: "../me.jpeg",     

    // 4. Fixed homepage (Points to root home.html)
    homePage: "./home.html", 

    // 5. Favicon Setting (Local subfolder asset)
    favicon: "logo1.png"         
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
