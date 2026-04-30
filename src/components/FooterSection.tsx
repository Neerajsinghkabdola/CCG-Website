"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
    return (
        <footer id="contact" className="pt-28 pb-10 text-center">
            <div className="max-w-[1400px] mx-auto px-[4%]">
                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-24"
                >
                    <h2 className="text-[clamp(2.8rem,6vw,5rem)] font-extrabold tracking-tight leading-[1.1] text-white/90 mb-10">
                        Ready to elevate
                        <br />
                        your brand?
                    </h2>
                    <a href="mailto:hello@kabdola.com" className="btn-glow text-lg px-12 py-5" data-cursor-hover>
                        Start a Project
                    </a>
                </motion.div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/[0.08] pt-10 gap-5">
                    <p className="text-white/30 text-sm">
                        &copy; 2026 KABDOLA. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {["Instagram", "LinkedIn", "Twitter"].map((name) => (
                            <a
                                key={name}
                                href="#"
                                className="text-white/30 text-sm hover:text-[#3ee8b5] transition-colors duration-300"
                                data-cursor-hover
                            >
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
