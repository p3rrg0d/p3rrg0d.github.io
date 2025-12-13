export function initCursor() {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
        // Main cursor - fast follow
        const dtFast = 1.0 - Math.pow(1.0 - 0.3, gsap.ticker.deltaRatio());
        cursorX += (mouseX - cursorX) * dtFast;
        cursorY += (mouseY - cursorY) * dtFast;

        // Ring - slightly slower but keeps dot inside
        const dtRing = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
        ringX += (mouseX - ringX) * dtRing;
        ringY += (mouseY - ringY) * dtRing;

        gsap.set(cursor, { x: cursorX, y: cursorY });
        gsap.set(ring, { x: ringX, y: ringY });

        checkCollisions(cursorX, cursorY);
    });

    function checkCollisions(cX, cY) {
        const cursorRadius = 4;

        document.querySelectorAll('.hero-title .letter').forEach(letter => {
            checkElementCollision(letter, cX, cY, cursorRadius,
                () => {
                    if (!letter.isHovered) {
                        letter.isHovered = true;
                        gsap.to(letter, { scale: 1.5, color: "#FF005C", duration: 0.3, ease: "back.out(1.7)" });
                    }
                },
                () => {
                    if (letter.isHovered) {
                        letter.isHovered = false;
                        gsap.to(letter, { scale: 1, color: "#CCFF00", duration: 0.3, ease: "power2.out" });
                    }
                }
            );
        });

        document.querySelectorAll('.toy-shape').forEach(shape => {
            checkElementCollision(shape, cX, cY, cursorRadius + 50,
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

        document.querySelectorAll('.toy-btn-social').forEach(btn => {
            checkElementCollision(btn, cX, cY, cursorRadius,
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

    function checkElementCollision(el, cX, cY, radius, onEnter, onLeave) {
        const rect = el.getBoundingClientRect();
        const closestX = Math.max(rect.left, Math.min(cX, rect.right));
        const closestY = Math.max(rect.top, Math.min(cY, rect.bottom));
        const distance = Math.hypot(cX - closestX, cY - closestY);

        if (distance < radius) {
            onEnter();
        } else {
            onLeave();
        }
    }

    document.querySelectorAll('a, button, .toy-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.2, ease: "power2.out" });
            gsap.to(ring, { scale: 1.3, duration: 0.3, ease: "power2.out" });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
            gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });
}
