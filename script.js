
gsap.registerPlugin(ScrollTrigger);

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

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

document.querySelectorAll('a, button, .toy-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, borderColor: '#FFF', borderWidth: '4px', duration: 0.1 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, borderColor: '#000', borderWidth: '2px', duration: 0.1 });
    });
});

const nickname = document.querySelector('.hero-title .word');

gsap.set(nickname, { x: 0, y: 0, rotation: 0, scale: 1, force3D: true });

const staticShake = gsap.to(nickname, {
    x: () => gsap.utils.random(-1, 1),
    rotation: () => gsap.utils.random(-0.3, 0.3),
    duration: 0.2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
});

nickname.addEventListener('mouseenter', () => {
    staticShake.pause();
    gsap.to(nickname, {
        scale: 1.1,
        color: "var(--c-black)",
        textShadow: "4px 0px 0px var(--c-neon), -4px 0px 0px var(--c-pink)",
        duration: 0.1
    });
});

nickname.addEventListener('mouseleave', () => {
    staticShake.play();
    gsap.to(nickname, {
        scale: 1,
        color: "var(--c-neon)",
        textShadow: "10px 10px 0px var(--c-black)",
        duration: 0.2
    });
});

const rumbleElements = document.querySelectorAll('.hover-rumble');
rumbleElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(el, {
            x: "random(-1, 1)",
            y: "random(-1, 1)",
            rotation: "random(-1, 1)",
            duration: 0.05,
            repeat: -1,
            yoyo: true,
            repeatRefresh: true
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.killTweensOf(el);
        gsap.to(el, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.2
        });
    });
});

const tl = gsap.timeline();
tl.from('.sticker-badge', {
    scale: 0,
    rotation: 360,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.2)"
})
    .from('.word', {
        y: 80,
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .from('.hero-socials-dock', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3")
    .from('.hero-footer-bar', {
        y: 50,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3")
    .from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
    }, "-=0.5");

gsap.utils.toArray('.toy-shape').forEach(shape => {
    gsap.to(shape, {
        rotation: "+=random(-60, 60)",
        y: "+=random(-50, 50)",
        x: "+=random(-50, 50)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

gsap.utils.toArray('.toy-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%"
        },
        y: 100,
        rotation: "random(-10, 10)",
        opacity: 0,
        duration: 0.4,
        ease: "back.out(2)"
    });
});

const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.querySelector('.icon-moon');
const sunIcon = document.querySelector('.icon-sun');
let isDark = false;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.style.filter = isDark ? 'invert(1) hue-rotate(180deg)' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'block';
    sunIcon.style.display = isDark ? 'block' : 'none';
});
