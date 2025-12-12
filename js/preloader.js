import { playHeroAnimations } from './animations.js';

export function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const consoleOutput = document.getElementById('console-output');
    const lines = [
        "> SYSTEM READY...",
        "> ACCESS GRANTED"
    ];

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

    startTyping();
}
