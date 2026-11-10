// Ambil parameter `themes` dan `name` dari URL secara dinamis
const urlParams = new URLSearchParams(window.location.search);
const themeName = urlParams.get('themes');
const recipientName = urlParams.get('name');
const iframeElement = document.getElementById('content-frame');

// 1. Cek apakah parameter `themes` atau `name` kosong/tidak lengkap
if (!themeName || !recipientName) {
    window.location.href = "../404.html"; // Lempar ke 404.html jika parameter kurang
} else {
    // 2. Cek apakah folder tema tersebut benar-benar ada di dalam folder /themes/
    fetch(`../themes/${themeName}/index.html`, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                // Jika folder/file tema tidak ada (misalnya salah ketik jadi SG002a), lempar ke 404
                window.location.href = "../404.html";
            } else {
                // Jika valid dan ada, muat iframe tema seperti biasa
                iframeElement.src = `../themes/${themeName}/`;
            }
        })
        .catch(() => {
            window.location.href = "../404.html";
        });
}

// Fungsi kembali ke halaman sebelumnya dengan mempertahankan posisi/riwayat
function goBack() {
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        window.history.back();
    } else {
        window.location.href = "../";
    }
}
