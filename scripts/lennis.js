// Configs do scroll smooth
const lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
    wheelMultiplier: 1,
    infinite: false
});

// Sobrescrição do scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);