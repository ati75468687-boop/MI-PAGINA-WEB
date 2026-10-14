// Funciones compartidas: menú adaptable, galería y video.

document.addEventListener('DOMContentLoaded', () => {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.getElementById('menuToggle');
            const overlay = document.getElementById('navOverlay');

            // Muestra u oculta el menú en pantallas pequeñas.
            function setMenu(open) {
                if (!sidebar || !toggle || !overlay) {
                    return;
                }

                sidebar.classList.toggle('is-open', open);
                overlay.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', String(open));
                toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
                document.body.style.overflow = open ? 'hidden' : '';
            }

            if (toggle) {
                toggle.addEventListener('click', () => {
                    setMenu(!sidebar.classList.contains('is-open'));
                });
            }

            if (overlay) {
                overlay.addEventListener('click', () => setMenu(false));
            }

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    setMenu(false);
                }
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 800) {
                    setMenu(false);
                }
            });

            // Indica qué imágenes de la galería se cargaron correctamente.
            document.querySelectorAll('.gallery-media img').forEach((img) => {
                const show = () => img.parentElement.classList.add('is-loaded');
                img.addEventListener('load', show);

                if (img.complete && img.naturalWidth > 0) {
                    show();
                }
            });

            // Presenta el video solamente si el archivo existe.
            document.querySelectorAll('video[data-optional-video]').forEach((video) => {
                const stage = video.closest('.video-stage');
                const source = video.querySelector('source');
                const show = () => stage?.classList.add('has-video');
                const hide = () => stage?.classList.remove('has-video');

                video.addEventListener('loadedmetadata', show);
                video.addEventListener('error', hide);
                source?.addEventListener('error', hide);

                if (video.readyState >= 1) {
                    show();
                }
            });

            // Los formularios realizan su envío original a Web3Forms.
        });
