export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    initKeyFloat();
    initProjectCards();
    initRumble();
}

export function playHeroAnimations() {
    const tl = gsap.timeline();

    tl.fromTo('.cube',
        { scale: 0, rotationX: 720, rotationY: 360 },
        {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 1.5,
            ease: "back.out(1.5)",
            onComplete: () => {
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
        .set('.word', { opacity: 1 })
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
        .to('.racing-stripe', {
            scaleY: 1,
            duration: 1.5,
            ease: "power4.inOut"
        }, "+=0.2")
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "+=0.5");
}

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

function initKeyFloat() {
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
}

function initProjectCards() {
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

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
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
}

function initRumble() {
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
}
