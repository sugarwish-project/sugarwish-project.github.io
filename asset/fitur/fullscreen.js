    <!-- Script Pemicu Fullscreen -->
    <script>
      const notifBar = document.getElementById('notifBar');

      notifBar.addEventListener('click', function() {
        const elem = document.documentElement; // Mengatur seluruh halaman ke mode fullscreen

        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
        }
      });
    </script>
