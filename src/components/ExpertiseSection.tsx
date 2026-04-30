"use client";

import { motion } from "framer-motion";

const pillars = [
    {
        number: "01",
        title: "Narrative & Content Strategy",
        desc: "Storytelling, authority content, scripts, and brand voice engineered for conversion.",
        gradient: "from-[#1a1a2e] to-[#16213e]",
    },
    {
        number: "02",
        title: "Cinematic Production",
        desc: "High-end visual storytelling, filming, and modern editing that captivates audiences.",
        gradient: "from-[#0f2027] to-[#203a43]",
    },
    {
        number: "03",
        title: "Brand Identity & Design Systems",
        desc: "Logos, visual systems, and premium branding that leaves a lasting impression.",
        gradient: "from-[#2c3e50] to-[#000000]",
    },
    {
        number: "04",
        title: "Digital Experience Architecture",
        desc: "Web design, UX/UI, and interactive platforms built for the modern consumer.",
        gradient: "from-[#141e30] to-[#243b55]",
    },
    {
        number: "05",
        title: "Growth Engineering",
        desc: "Performance marketing, scaling strategies, and deep analytics to fuel growth.",
        gradient: "from-[#2b5876] to-[#4e4376]",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function ExpertiseSection() {
    return (
        <section id="expertise" className="py-28 md:py-36 relative">
            <div className="max-w-[1400px] mx-auto px-[4%]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight leading-[1.1] text-white/90 mb-4">
                        Our Expertise
                    </h2>
                    <p className="text-white/50 text-lg max-w-lg leading-relaxed">
                        Everything your brand needs under one roof. Designed to scale
                        seamlessly.
                    </p>
                </motion.div>

                {/* Pillar Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex flex-col border-t border-white/[0.08]"
                >
                    {pillars.map((p) => (
                        <motion.div
                            key={p.number}
                            variants={itemVariants}
                            className="group flex flex-col md:flex-row md:items-center py-10 border-b border-white/[0.08] relative cursor-pointer transition-all duration-500 hover:pl-5 hover:border-white/20"
                            data-cursor-hover
                        >
                            {/* Number */}
                            <span className="font-light text-2xl text-white/30 md:w-[10%] mb-3 md:mb-0 transition-colors duration-500 group-hover:text-[#3ee8b5]">
                                {p.number}
                            </span>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-[clamp(1.8rem,3.5vw,3.2rem)] font-extrabold tracking-tight transition-all duration-500 group-hover:tracking-[1px] text-white/90 group-hover:text-white">
                                    {p.title}
                                </h3>
                                <p className="text-white/40 text-base md:text-lg max-w-xl mt-0 overflow-hidden max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    {p.desc}
                                </p>
                            </div>

                            {/* Hover Image Card */}
                            <div
                                className={`hidden md:block absolute right-[8%] top-1/2 -translate-y-1/2 w-72 h-44 bg-gradient-to-br ${p.gradient} rounded-xl opacity-0 scale-[0.85] rotate-[5deg] pointer-events-none shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0`}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
