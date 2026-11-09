document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {

    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
    
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
        e.preventDefault();
        return false;
    }
});
