"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { HeadingDivider } from "components";
import { TimeLine } from "./TimeLine";

export function AboutSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me" />
				<div className="pt-10 pb-16 max-w-5xl flex flex-col gap-3">
					<div
						tabIndex="0"
						ref={ref}
						className="text-xl font-light leading-relaxed"
						style={{
							transform: isInView ? "none" : "translateX(-200px)",
							opacity: isInView ? 1 : 0,
							transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
						}}
					>
						<p>
						I'm Chandresh Kumar, a dedicated software engineer with a passion for coding and a strong foundation in programming languages 
						such as Java, Python, and JavaScript. My journey into the tech world began during my undergraduate studies in Computer Science at 
						Keshav Memorial Institute of Technology, where I excelled academically with a GPA of 8.0.
						</p>
						<p className="my-3.5">
							Beyond the screen, I'm an avid problem solver and a competitive coder. When I'm not crafting digital solutions, you can find me delving into 
							outdoor activities and video games or unwinding with a good movie and some music.
						</p>
						<p className="my-3.5">
							With hands-on experience in web development technologies like ReactJS and Flask, and a knack for building seamless CI/CD pipelines 
							using Jenkins, I'm always ready to take on new challenges in the dynamic world of software engineering. Whether it's crafting 
							user-friendly web applications or engaging in some friendly coding competition, I'm always up for the next exciting venture.
						</p>
					</div>
				</div>

				<TimeLine />
			</section>
		</LazyMotion>
	);
}
