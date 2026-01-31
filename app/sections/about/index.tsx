"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { HeadingDivider } from "components";
import Image from "next/image";
import { blurDataUrl } from "utils/theme-config";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1
		}
	}
};

const textVariants = {
	hidden: { x: -20, opacity: 0, filter: "blur(8px)" },
	visible: {
		x: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: {
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1]
		}
	}
};

export function AboutSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const isTextInView = useInView(textRef, { once: true, margin: "-100px" });
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isMobile, setIsMobile] = useState(false);

	// Detect mobile to disable effects
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	});

	const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isMobile) return;
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePos({
			x: (e.clientX - rect.left - rect.width / 2) * 0.08,
			y: (e.clientY - rect.top - rect.height / 2) * 0.08
		});
	};

	const handleMouseLeave = () => {
		setMousePos({ x: 0, y: 0 });
	};

	return (
		<section id="about" className="section" ref={containerRef}>
			<HeadingDivider title="About me" />
			<div className="pt-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
				{/* Image with parallax and magnetic hover */}
				<motion.div
					className="w-full md:w-1/3 flex justify-center"
					style={{ y: isMobile ? 0 : imageY }}
				>
					<motion.div
						className="relative cursor-pointer"
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
						animate={{ x: mousePos.x, y: mousePos.y }}
						transition={{ type: "spring", stiffness: 150, damping: 15 }}
					>
						<Image
							src="/images/about-pic.jpg"
							width={240}
							height={320}
							alt="About me image"
							className="rounded-xl shadow-2xl transition-transform duration-300 md:w-[300px] md:h-[400px]"
							placeholder="blur"
							blurDataURL={blurDataUrl}
							priority
						/>
						{/* Glow effect */}
						<div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-light/20 via-transparent to-blue-light/10 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
					</motion.div>
				</motion.div>

				{/* Text with stagger animation */}
				<motion.div
					ref={textRef}
					className="w-full md:w-2/3 text-base md:text-lg font-light leading-relaxed"
					variants={containerVariants}
					initial="hidden"
					animate={isTextInView ? "visible" : "hidden"}
				>
					<motion.p variants={textVariants} tabIndex={0}>
						I&apos;m <span className="font-medium text-primary-color">Chandresh Kumar</span>, a{" "}
						<span className="font-medium text-primary-color">Software Engineer</span> who enjoys
						writing code and solving problems. My journey began at{" "}
						<a
							href="https://kmit.in"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary-color hover:underline"
						>
							KMIT
						</a>
						, where I studied Computer Science and built a strong foundation in core concepts that
						still guide how I approach engineering challenges today.
					</motion.p>
					<motion.p variants={textVariants} className="my-4" tabIndex={0}>
						Over the years, I&apos;ve worked with a range of technologies and projects, each
						teaching me something new about building systems that are easy to understand, maintain,
						and grow. I write code with intention - focusing on{" "}
						<span className="font-medium text-primary-color">clarity</span>,{" "}
						<span className="font-medium text-primary-color">performance</span>, and{" "}
						<span className="font-medium text-primary-color">long-term quality</span>. Whether
						I&apos;m improving backend services, building intuitive interfaces, or debugging tricky
						issues, I try to be thoughtful and thorough in every step.
					</motion.p>
					<motion.p variants={textVariants} tabIndex={0}>
						When I&apos;m not coding, I&apos;m learning, playing video games, staying active, or
						enjoying some music and movies.
					</motion.p>
				</motion.div>
			</div>
		</section>
	);
}
