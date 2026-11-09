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

/* --- LOGIKA RENDER TEMA & PAGINATION DARI JSON --- */
document.addEventListener("DOMContentLoaded", function () {
    const themeContainer = document.getElementById("theme-list");
    const paginationContainer = document.getElementById("pagination");

    let themesData = [];
    const itemsPerPage = 6; // Mengatur jumlah tema per halaman (6 item)
    let currentPage = 1;

    // Mengambil data dari file themes.json
    fetch("themes.json")
        .then(response => response.json())
        .then(data => {
            themesData = data;
            displayThemes(currentPage);
            setupPagination();
        })
        .catch(error => console.error("Gagal memuat data tema:", error));

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
                    <img src="${theme.image}" alt="${theme.name}" />
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
                displayThemes(currentPage);

                let currentActive = paginationContainer.querySelector(".active");
                if (currentActive) {
                    currentActive.classList.remove("active");
                }
                btn.classList.add("active");

                // Scroll otomatis secara halus ke bagian tema saat pindah halaman
                document.getElementById("theme").scrollIntoView({ behavior: "smooth" });
            });

            paginationContainer.appendChild(btn);
        }
    }
});
