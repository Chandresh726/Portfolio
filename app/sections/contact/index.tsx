"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1]
		}
	}
};

export function ContactSection() {
	return (
		<section id="contact" className="section">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
			>
				<div className="rounded-2xl border border-outline/30 bg-surface-variant/50 backdrop-blur-sm p-8 md:p-12 text-center w-full">
					<p className="text-lg md:text-xl text-text-muted italic mb-6">
						I&apos;d love to hear from you.
					</p>
					<a
						href="mailto:kchandresh726@gmail.com"
						className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-light/10 border border-blue-light/30 text-blue-light font-medium transition-all duration-300 hover:bg-blue-light/20 hover:border-blue-light/50 hover:shadow-lg"
					>
						<div className="relative size-8 rounded-full overflow-hidden">
							<Image
								src="/favicon.png"
								alt="Chandresh Kumar"
								fill
								className="object-cover"
							/>
						</div>
						Let&apos;s talk
					</a>
				</div>
			</motion.div>
		</section>
	);
}
