(function() {
    // Automatically find the directory where load-global.js is located
    const scripts = document.getElementsByTagName('script');
    let globalPath = './global/';
    
    for (let script of scripts) {
        if (script.src && script.src.includes('load-global.js')) {
            // Extract everything before 'load-global.js' to form the exact relative/absolute folder path
            globalPath = script.src.substring(0, script.src.lastIndexOf('/') + 1);
            break;
        }
    }

    // Load CSS correctly as a stylesheet link
    document.write('<link rel="stylesheet" href="' + globalPath + 'styles.css">');

    // Load JavaScript configuration and utility files using the dynamically detected path
    document.write('<script src="' + globalPath + 'master-config.js"></script>');
    document.write('<script src="' + globalPath + 'restrictions.js"></script>');
    document.write('<script src="' + globalPath + 'includes.js"></script>');
    document.write('<script src="' + globalPath + 'quick-links.js"></script>');
})();
