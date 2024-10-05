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
				<div className="pt-10 pb-10 max-w-5xl flex flex-col gap-3">
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
							I&apos;m Chandresh Kumar, a software engineer who loves coding. I know programming languages like Java, Python, and 
							JavaScript. My journey in tech began during my Computer Science studies at Keshav Memorial Institute of Technology, 
							where I earned a GPA of 8.0.
						</p>
						<p className="my-3.5">
							Outside of coding, I enjoy solving problems and am interested in web3 development. When I&apos;m not building digital 
							solutions, I like to spend time outdoors, play video games, or relax with a good movie and music.
						</p>
						<p className="my-3.5">
							I&apos;m always ready to take on new challenges in the fast-changing world of software engineering, whether it&apos;s creating 
							user-friendly web applications or exploring web3 development.
						</p>
					</div>
				</div>
				{/* <TimeLine /> */}
			</section>
		</LazyMotion>
	);
}
