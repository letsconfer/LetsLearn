(function() {
    const isSubfolder = window.location.pathname.includes('/main/') || window.location.pathname.includes('/basic/');
    const globalPath = isSubfolder ? '../global/' : './global/';

    document.write('<script src="' + globalPath + 'master-config.js"></script>');
    document.write('<script src="' + globalPath + 'restrictions.js"></script>');
    document.write('<script src="' + globalPath + 'includes.js"></script>');
    document.write('<script src="' + globalPath + 'quick-links.js"></script>');
})();
