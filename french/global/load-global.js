(function() {
    const isSubfolder = window.location.pathname.includes('/main/') || window.location.pathname.includes('/basic/') || window.location.pathname.includes('/a1/')|| window.location.pathname.includes('/a2/') || window.location.pathname.includes('/b1/') || window.location.pathname.includes('/b2/') ;
    const globalPath = isSubfolder ? '../global/' : './global/';

    document.write('<script src="' + globalPath + 'master-config.js"></script>');
    document.write('<script src="' + globalPath + 'restrictions.js"></script>');
    document.write('<script src="' + globalPath + 'includes.js"></script>');
    document.write('<script src="' + globalPath + 'quick-links.js"></script>');
    document.write('<script src="' + globalPath + 'styles.css"></script>');
})();