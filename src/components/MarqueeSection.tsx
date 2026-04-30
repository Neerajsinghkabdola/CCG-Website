"use client";

const words = ["CREATE", "BUILD", "GROW", "SCALE", "INNOVATE"];

export default function MarqueeSection() {
    const content = words.map((w) => w + " • ").join("");
    // Duplicate for seamless loop
    const doubled = content + content;

    return (
        <section className="py-14 border-t border-b border-white/[0.06] overflow-hidden bg-[#0a1315]">
            <div className="w-[100vw] flex whitespace-nowrap">
                <div className="marquee-animate inline-flex">
                    {doubled.split(" • ").map((word, i) =>
                        word.trim() ? (
                            <span
                                key={i}
                                className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase mx-8 text-transparent"
                                style={{
                                    WebkitTextStroke: "1px rgba(62, 232, 181, 0.15)",
                                }}
                            >
                                {word.trim()}
                            </span>
                        ) : null
                    )}
                </div>
            </div>
        </section>
    );
}
