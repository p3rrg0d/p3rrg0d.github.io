import { initPreloader } from './preloader.js';
import { initCursor } from './cursor.js';
import { initTheme } from './theme.js';
import { initAnimations } from './animations.js';

const lenis = new Lenis({
    duration: 0.5,
    easing: (t) => t,
    smooth: true,
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

initTheme();
initCursor();
initAnimations();
initPreloader();
