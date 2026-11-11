document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mencegah Klik Kanan (Context Menu)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // 2. Mencegah Pintasan Keyboard & Tombol Pintar
    document.addEventListener('keydown', function(e) {
        // Blokir tombol F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        
        // Blokir Ctrl + Shift + I, J, C (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            return false;
        }
        
        // Blokir Ctrl + U (View Source)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }

        // Blokir Ctrl + C, X, A, P (Copy, Cut, Select All, Print)
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'a' || e.key === 'A' || e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            return false;
        }
    });

    // 3. Deteksi Konsol Terbuka (Anti-DevTools)
    (function() {
        const threshold = 160;
        setInterval(function() {
            if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
                document.body.innerHTML = "<h2 style='text-align:center; margin-top:30vh; color:red; font-family:sans-serif;'>Akses Ditolak! Developer Tools Terdeteksi.</h2>";
            }
        }, 1000);
    })();

});
