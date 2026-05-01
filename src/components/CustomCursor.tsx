"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;
        if (!dot || !outline) return;

        const onMouseMove = (e: MouseEvent) => {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;

            outline.animate(
                { left: `${e.clientX}px`, top: `${e.clientY}px` },
                { duration: 400, fill: "forwards" }
            );
        };

        const interactiveSelector = "a, button, [data-cursor-hover]";

        const onMouseEnter = () => {
            outline.style.width = "48px";
            outline.style.height = "48px";
            outline.style.backgroundColor = "rgba(62, 232, 181, 0.08)";
            outline.style.borderColor = "rgba(62, 232, 181, 0.8)";
        };

        const onMouseLeave = () => {
            outline.style.width = "32px";
            outline.style.height = "32px";
            outline.style.backgroundColor = "transparent";
            outline.style.borderColor = "rgba(62, 232, 181, 0.5)";
        };

        window.addEventListener("mousemove", onMouseMove);

        const registerInteractive = () => {
            document.querySelectorAll(interactiveSelector).forEach((el) => {
                el.addEventListener("mouseenter", onMouseEnter);
                el.addEventListener("mouseleave", onMouseLeave);
            });
        };

        registerInteractive();
        const observer = new MutationObserver(registerInteractive);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={outlineRef} className="cursor-outline" />
        </>
    );
}
