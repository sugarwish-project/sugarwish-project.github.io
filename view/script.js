// Ambil parameter `themes` dari URL secara dinamis dan tunggal
const urlParams = new URLSearchParams(window.location.search);
const themeName = urlParams.get('themes');
const iframeElement = document.getElementById('content-frame');

if (themeName) {
    // Jalur folder themes tanpa versi tambahan
    iframeElement.src = `../themes/${themeName}/`;
} else {
    iframeElement.srcdoc = "<body><div style='text-align:center; padding:50px; font-family:sans-serif;'><h3>Tema tidak ditemukan</h3></div></body>";
}

// Fungsi kembali ke halaman sebelumnya dengan mempertahankan posisi/riwayat
function goBack() {
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        window.history.back();
    } else {
        window.location.href = "../";
    }
}
