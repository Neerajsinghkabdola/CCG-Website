"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 240;
const FRAME_PREFIX = "ezgif-frame-";

function getFramePath(index: number): string {
    const num = String(index + 1).padStart(3, "0");
    return `/images/${FRAME_PREFIX}${num}.jpg`;
}

/* ─── Text Overlay Data ─── */
interface Overlay {
    start: number;
    end: number;
    align: "center" | "left" | "right";
    title: string;
    subtitle: string;
}

const overlays: Overlay[] = [
    {
        start: 0,
        end: 0.2,
        align: "center",
        title: "We Build Brands\nThat Dominate.",
        subtitle:
            "Content isn't an afterthought — it's the strategy. We think like storytellers and execute like marketers.",
    },
    {
        start: 0.25,
        end: 0.45,
        align: "left",
        title: "Precision\nEngineered.",
        subtitle:
            "Every detail is intentional. We craft experiences where form and function converge seamlessly.",
    },
    {
        start: 0.5,
        end: 0.7,
        align: "right",
        title: "Every Component\nMatters.",
        subtitle:
            "From the sensor to the shutter — nothing is accidental. Quality lives in the details.",
    },
    {
        start: 0.82,
        end: 0.98,
        align: "center",
        title: "Start Your\nNext Project.",
        subtitle:
            "Ready to create something extraordinary? Let's build your brand's next chapter together.",
    },
];

/* ─── Main Component ─── */
export default function ScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const rafRef = useRef<number>(0);
    const currentFrameRef = useRef<number>(0);

    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, TOTAL_FRAMES - 1]
    );

    /* ─── Preload all images ─── */
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                if (loadedCount === TOTAL_FRAMES) {
                    imagesRef.current = images;
                    setLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                if (loadedCount === TOTAL_FRAMES) {
                    imagesRef.current = images;
                    setLoaded(true);
                }
            };
            images[i] = img;
        }
    }, []);

    /* ─── Draw frame to canvas ─── */
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = imagesRef.current[index];
        if (!canvas || !ctx || !img || !img.complete) return;

        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, w, h);

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (imgRatio > canvasRatio) {
            drawH = h;
            drawW = h * imgRatio;
            drawX = (w - drawW) / 2;
            drawY = 0;
        } else {
            drawW = w;
            drawH = w / imgRatio;
            drawX = 0;
            drawY = (h - drawH) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }, []);

    /* ─── Subscribe to scroll ─── */
    useEffect(() => {
        if (!loaded) return;

        drawFrame(0);

        const unsubscribe = frameIndex.on("change", (v) => {
            const idx = Math.min(Math.round(v), TOTAL_FRAMES - 1);
            if (idx !== currentFrameRef.current) {
                currentFrameRef.current = idx;
                cancelAnimationFrame(rafRef.current);
                rafRef.current = requestAnimationFrame(() => drawFrame(idx));
            }
        });

        const onResize = () => drawFrame(currentFrameRef.current);
        window.addEventListener("resize", onResize);

        return () => {
            unsubscribe();
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", onResize);
        };
    }, [loaded, frameIndex, drawFrame]);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            {/* ─── Loading Screen ─── */}
            {!loaded && (
                <div className="fixed inset-0 z-[200] bg-[#0d1b1e] flex flex-col items-center justify-center gap-6">
                    <div className="loader-ring" />
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[#3ee8b5] font-mono text-sm tracking-widest">
                            {progress}%
                        </span>
                        <span className="text-white/40 text-xs tracking-wider uppercase">
                            Loading experience
                        </span>
                    </div>
                    <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#3ee8b5]"
                            style={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut" }}
                        />
                    </div>
                </div>
            )}

            {/* ─── Sticky Canvas ─── */}
            <div className="sticky top-0 h-screen w-full">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: "#0d1b1e" }}
                />

                {/* ─── Text Overlays ─── */}
                {loaded &&
                    overlays.map((ov, i) => (
                        <TextOverlay
                            key={i}
                            overlay={ov}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
            </div>
        </div>
    );
}

/* ─── Text Overlay Sub-component ─── */
// Hooks are now correctly called at the top level of this component,
// not inside a .map() callback — fixes the Rules of Hooks violation.
function TextOverlay({
    overlay,
    scrollYProgress,
}: {
    overlay: Overlay;
    scrollYProgress: MotionValue<number>;
}) {
    const { start, end } = overlay;
    const fadeIn = start + 0.03;
    const fadeOut = end - 0.03;

    const opacity = useTransform(scrollYProgress, [start, fadeIn, fadeOut, end], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [start, fadeIn, fadeOut, end], [40, 0, 0, -40]);

    const alignClasses = {
        center: "items-center text-center",
        left: "items-start text-left pl-[6%] md:pl-[8%]",
        right: "items-end text-right pr-[6%] md:pr-[8%]",
    };

    return (
        <motion.div
            className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${alignClasses[overlay.align]}`}
            style={{ opacity, y }}
        >
            <h2 className="text-[clamp(2.2rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight whitespace-pre-line text-white/90 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                {overlay.title}
            </h2>
            <p className="mt-5 text-[clamp(0.95rem,1.5vw,1.25rem)] text-white/50 max-w-lg leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                {overlay.subtitle}
            </p>
            {overlay.align === "center" && overlay.start > 0.5 && (
                <a
                    href="#contact"
                    className="btn-glow mt-8 pointer-events-auto"
                    data-cursor-hover
                >
                    Get Started
                </a>
            )}
            {overlay.align === "center" && overlay.start === 0 && (
                <a
                    href="#expertise"
                    className="btn-glow mt-8 pointer-events-auto"
                    data-cursor-hover
                >
                    Explore Our Services
                </a>
            )}
        </motion.div>
    );
}
