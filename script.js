
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

// --- PRELOADER (Hacker Console) ---
const preloader = document.querySelector('.preloader');
const consoleOutput = document.getElementById('console-output');
const lines = [
    "> SYSTEM READY...",
    "> ACCESS GRANTED"
];

// Disable scroll initially
document.body.style.overflow = 'hidden';

function typeLine(text, index = 0, lineIndex) {
    if (index < text.length) {
        if (consoleOutput) consoleOutput.innerHTML += text.charAt(index);
        setTimeout(() => typeLine(text, index + 1, lineIndex), 20);
    } else {
        if (consoleOutput) consoleOutput.innerHTML += '<br>';
        if (lineIndex < lines.length - 1) {
            setTimeout(() => startTyping(lineIndex + 1), 50);
        } else {
            // Sequence Complete
            setTimeout(finishPreloader, 200);
        }
    }
}

function startTyping(lineIndex = 0) {
    typeLine(lines[lineIndex], 0, lineIndex);
}

function finishPreloader() {
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
            if (preloader) preloader.style.display = "none";
            document.body.style.overflow = "";
            playHeroAnimations();
        }
    });
}

// Start sequence
startTyping();

// --- CURSOR LOGIC ---
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Track mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Main Loop (Movement + Collision)
gsap.ticker.add(() => {
    // 1. Smooth Follow (Simple, no liquid physics)
    const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
    cursorX += (mouseX - cursorX) * dt;
    cursorY += (mouseY - cursorY) * dt;

    gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
        overwrite: "auto"
    });

    // 2. Universal Collision Detection
    checkCollisions();
});

function checkCollisions() {
    const cursorRadius = 25;

    // A. Letters
    document.querySelectorAll('.hero-title .letter').forEach(letter => {
        checkElementCollision(letter, cursorRadius,
            () => { // On Enter
                if (!letter.isHovered) {
                    letter.isHovered = true;
                    gsap.to(letter, { scale: 1.5, color: "#FF005C", duration: 0.3, ease: "back.out(1.7)" });
                }
            },
            () => { // On Leave
                if (letter.isHovered) {
                    letter.isHovered = false;
                    gsap.to(letter, { scale: 1, color: "#CCFF00", duration: 0.3, ease: "power2.out" });
                }
            }
        );
    });

    // B. Tetrominoes (Toy Shapes)
    document.querySelectorAll('.toy-shape').forEach(shape => {
        checkElementCollision(shape, cursorRadius + 50,
            () => {
                if (!shape.isHovered) {
                    shape.isHovered = true;
                    gsap.to(shape, { scale: 1.2, duration: 0.3, ease: "back.out(1.7)" });
                }
            },
            () => {
                if (shape.isHovered) {
                    shape.isHovered = false;
                    gsap.to(shape, { scale: 1, duration: 0.3, ease: "power2.out" });
                }
            }
        );
    });

    // C. Social Icons
    document.querySelectorAll('.toy-btn-social').forEach(btn => {
        checkElementCollision(btn, cursorRadius,
            () => {
                if (!btn.isHovered) {
                    btn.isHovered = true;
                    gsap.to(btn, { scale: 1.3, backgroundColor: "var(--c-neon)", color: "var(--c-black)", duration: 0.2 });
                }
            },
            () => {
                if (btn.isHovered) {
                    btn.isHovered = false;
                    gsap.to(btn, { scale: 1, backgroundColor: "var(--bg-card)", color: "var(--text-main)", duration: 0.2 });
                }
            }
        );
    });
}

function checkElementCollision(el, radius, onEnter, onLeave) {
    const rect = el.getBoundingClientRect();
    const closestX = Math.max(rect.left, Math.min(cursorX, rect.right));
    const closestY = Math.max(rect.top, Math.min(cursorY, rect.bottom));
    const distance = Math.hypot(cursorX - closestX, cursorY - closestY);

    if (distance < radius) {
        onEnter();
    } else {
        onLeave();
    }
}

// Individual letter animations (random float)
// Individual letter animations (random float) - wrapped in function
function initLetterFloat() {
    const letters = document.querySelectorAll('.hero-title .letter');
    letters.forEach((letter, index) => {
        gsap.to(letter, {
            y: () => gsap.utils.random(-12, 12),
            rotation: () => gsap.utils.random(-5, 5),
            duration: gsap.utils.random(3.5, 4.5),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.1
        });
    });
}

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

function playHeroAnimations() {
    const tl = gsap.timeline();

    // Dramatic Cube Entrance
    tl.fromTo('.cube',
        { scale: 0, rotationX: 720, rotationY: 360 },
        {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 1.5,
            ease: "back.out(1.5)",
            onComplete: () => {
                // Start continuous spin after entrance
                gsap.to('.cube', {
                    rotationX: 360,
                    rotationY: 360,
                    duration: 10,
                    repeat: -1,
                    ease: "none"
                });
            }
        }
    )
        .fromTo('.sticker-badge',
            { scale: 0, rotation: 360 },
            { scale: 1, rotation: -15, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" }, "-=0.8")
        .set('.word', { opacity: 1 }) // Ensure container is visible
        .fromTo('.hero-title .letter',
            { y: 100, opacity: 0, scale: 0 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.15,
                duration: 0.8,
                ease: "back.out(1.2)",
                onComplete: initLetterFloat
            }
            , "-=0.5")
        .fromTo('.hero-socials-dock',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "+=0.2")
        .fromTo('.floating-toys .toy-shape',
            { scale: 0, opacity: 0, rotation: 180 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }
            , "-=0.4")
        .to('.hero-footer-bar', {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.5")
        .to('.racing-stripe', {
            scaleY: 1,
            duration: 1.5,
            ease: "power4.inOut"
        }, "+=0.2");
}

// Floating keys animation loop
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
    // Scroll Entrance
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

    // 3D Tilt Effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Invert X for natural tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center center"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// Theme Toggling
const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.querySelector('.icon-moon');
const sunIcon = document.querySelector('.icon-sun');

// Check for saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    // Update Icons
    moonIcon.style.display = isDark ? 'none' : 'block';
    sunIcon.style.display = isDark ? 'block' : 'none';

    // Save Preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
