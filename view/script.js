const urlParams = new URLSearchParams(window.location.search);
const themeName = urlParams.get('themes');
const iframeElement = document.getElementById('content-frame');

if (themeName) {
    iframeElement.src = `../themes/${themeName}/`;
} else {
    iframeElement.srcdoc = "<body><div style='text-align:center; padding:50px; font-family:sans-serif;'><h3>Tema tidak ditemukan</h3></div></body>";
}
