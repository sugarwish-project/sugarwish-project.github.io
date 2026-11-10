const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 80);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navlist.classList.remove("open");
};

/* --- LOGIKA RENDER TEMA, SKELETON, & PAGINATION DARI JSON --- */
document.addEventListener("DOMContentLoaded", function () {
    const themeContainer = document.getElementById("theme-list");
    const paginationContainer = document.getElementById("pagination");

    let themesData = [];
    const itemsPerPage = 6; // Jumlah item per halaman
    let currentPage = 1;

    // 1. Tampilkan efek skeleton loading saat halaman pertama kali dimuat
    showSkeletonLoading(itemsPerPage);

    // 2. Ambil data dari file themes.json
    fetch("themes.json")
        .then(response => response.json())
        .then(data => {
            themesData = data;
            displayThemes(currentPage);
            setupPagination();
        })
        .catch(error => {
            console.error("Gagal memuat data tema:", error);
            if (themeContainer) {
                themeContainer.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: red;'>Gagal memuat daftar tema.</p>";
            }
        });

    // Fungsi untuk menampilkan kotak-kotak skeleton sementara memuat data
    function showSkeletonLoading(count) {
        if (!themeContainer) return;
        let skeletonHTML = "";
        for (let i = 0; i < count; i++) {
            skeletonHTML += `
                <div class="theme-item skeleton">
                    <img>
                    <div class="bottom" style="width: 100%;">
                        <div class="skeleton-line long"></div>
                        <div class="skeleton-line short"></div>
                    </div>
                </div>
            `;
        }
        themeContainer.innerHTML = skeletonHTML;
    }

    // Fungsi untuk menampilkan tema sesuai halaman yang aktif
function displayThemes(page) {
        if (!themeContainer) return;
        themeContainer.innerHTML = "";
        
        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = themesData.slice(start, end);

        let output = "";
        paginatedItems.forEach(theme => {
            output += `
                <div class="theme-item">
                    <a href="${theme.image}" class="glightbox" data-gallery="theme-gallery" data-title="${theme.name}">
                        <img src="${theme.image}" alt="${theme.name}" />
                    </a>
                    <div class="bottom">
                        <div class="name">
                            <h4>${theme.name}</h4>
                            <span>${theme.price}</span>
                        </div>
                        <a href="${theme.link}" class="s-btn">Lihat Contoh</a>
                    </div>
                </div>
            `;
        });
        themeContainer.innerHTML = output;

        // Inisialisasi ulang GLightbox setiap kali tema selesai dirender
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: true
        });
    }
  
    // Fungsi untuk membuat tombol nomor halaman secara otomatis
    function setupPagination() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = "";
        let pageCount = Math.ceil(themesData.length / itemsPerPage);

        if (pageCount <= 1) return;

        for (let i = 1; i <= pageCount; i++) {
            let btn = document.createElement("button");
            btn.innerText = i;
            
            if (i === currentPage) {
                btn.classList.add("active");
            }

            btn.addEventListener("click", function () {
                currentPage = i;
                
                // Tampilkan skeleton singkat saat pindah halaman agar terasa dinamis
                showSkeletonLoading(itemsPerPage);
                
                // Beri sedikit jeda agar animasi skeleton terlihat smooth saat klik halaman
                setTimeout(() => {
                    displayThemes(currentPage);
                }, 200);

                let currentActive = paginationContainer.querySelector(".active");
                if (currentActive) {
                    currentActive.classList.remove("active");
                }
                btn.classList.add("active");

                // Scroll otomatis secara halus ke bagian tema
                document.getElementById("theme").scrollIntoView({ behavior: "smooth" });
            });

            paginationContainer.appendChild(btn);
        }
    }
});


// 1. Mencegah Klik Kanan
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 2. Mencegah Shortcut Keyboard (Ctrl+C, Ctrl+U, F12, dll)
document.addEventListener('keydown', function(e) {
    // Mencegah F12 (Inspect Element)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Mencegah Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
    
    // Mencegah Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }

    // Mencegah Ctrl+C (Copy), Ctrl+X (Cut), Ctrl+A (Select All)
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
        e.preventDefault();
        return false;
    }
});
