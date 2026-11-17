(function() {
    const isSubfolder = window.location.pathname.includes('/main/') || window.location.pathname.includes('/grammar/') || window.location.pathname.includes('/listening/')|| window.location.pathname.includes('/reading/') || window.location.pathname.includes('/speaking/') || window.location.pathname.includes('/writing/') || window.location.pathname.includes('/ielts/');
    const globalPath = isSubfolder ? '../global/' : './global/';

    // Load CSS correctly as a stylesheet link
    document.write('<link rel="stylesheet" href="' + globalPath + 'styles.css">');

    // Load JavaScript configuration and utility files
    document.write('<script src="' + globalPath + 'master-config.js"></script>');
    document.write('<script src="' + globalPath + 'restrictions.js"></script>');
    document.write('<script src="' + globalPath + 'includes.js"></script>');
    document.write('<script src="' + globalPath + 'quick-links.js"></script>');
})();