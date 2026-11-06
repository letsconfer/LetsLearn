(function() {
    const isSubfolder = window.location.pathname.includes('/Main/') || window.location.pathname.includes('/Basic/');
    const globalPath = isSubfolder ? '../Global/' : './Global/';

    document.write('<script src="' + globalPath + 'master-config.js"></script>');
    document.write('<script src="' + globalPath + 'restrictions.js"></script>');
    document.write('<script src="' + globalPath + 'includes.js"></script>');
    document.write('<script src="' + globalPath + 'quick-links.js"></script>');
})();