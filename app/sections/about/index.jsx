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
							I&apos;m Chandresh Kumar, a software engineer with a love for coding and a proficiency in programming languages such as 
							Java, Python, and JavaScript. My journey into the tech realm commenced during my undergraduate studies in Computer Science at Keshav 
							Memorial Institute of Technology, where I achieved academic excellence with a GPA of 8.0.
						</p>
						<p className="my-3.5">
						Beyond the coding screen, I&apos;m a passionate problem solver and a coder intrigued by the challenges of web3 development. When I&apos;m not 
						architecting digital solutions, you&apos;ll find me immersing myself in outdoor activities and video games or relaxing with a good movie and some music.
						</p>
						<p className="my-3.5">
						With practical experience in web development technologies like ReactJS, Spring Boot, and Jenkins, I&apos;m always prepared to tackle new 
						challenges in the ever-evolving world of software engineering. Whether it&apos;s creating user-friendly web applications or diving into 
						the intricacies of web3 development, I&apos;m consistently eager for the next thrilling venture.
						</p>
					</div>
				</div>

				<TimeLine />
			</section>
		</LazyMotion>
	);
}
