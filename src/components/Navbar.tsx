"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Expertise", href: "#expertise" },
    { label: "About", href: "#about" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handler = () => {
            const currentY = window.scrollY;

            // Scrolled style (compact nav)
            setScrolled(currentY > 60);

            // Hide on scroll down, show on scroll up
            if (currentY > lastScrollY.current && currentY > 100) {
                // Scrolling DOWN past 100px — hide
                setVisible(false);
            } else {
                // Scrolling UP — show
                setVisible(true);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: visible ? 0 : -120 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled
                    ? "py-3 bg-[rgba(13,27,30,0.92)] shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                    : "py-5 bg-[rgba(13,27,30,0.6)]"
                } backdrop-blur-xl border-b border-white/[0.06]`}
        >
            <div className="max-w-[1400px] mx-auto px-[4%] flex justify-between items-center">
                {/* Logo */}
                <a
                    href="#"
                    className="font-bold text-[1.4rem] tracking-[2px] uppercase"
                    data-cursor-hover
                >
                    KABDOLA
                    <span className="text-[#3ee8b5]">.</span>
                </a>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-10 items-center list-none">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-[0.92rem] font-medium text-white/50 hover:text-white transition-colors duration-300 relative after:absolute after:w-0 after:h-[1px] after:bottom-[-4px] after:left-0 after:bg-[#3ee8b5] after:transition-all after:duration-300 hover:after:w-full"
                                data-cursor-hover
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#contact"
                            className="bg-white text-[#0d1b1e] px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 transition-transform duration-300"
                            data-cursor-hover
                        >
                            Let&apos;s Talk
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    data-cursor-hover
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full bg-[rgba(13,27,30,0.97)] backdrop-blur-xl border-b border-white/[0.06] py-8"
                    >
                        <ul className="flex flex-col items-center gap-6 list-none">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-lg text-white/60 hover:text-white transition-colors"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="#contact"
                                    className="btn-glow"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Let&apos;s Talk
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
