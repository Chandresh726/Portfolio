"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { HeadingDivider } from "components";

const fadeInLeft = {
  initial: { x: -200, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1], delay: 0.5 }
};

export function AboutSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me" />
				<div className="pt-10 pb-10 max-w-5xl flex flex-col gap-3">
					<m.div
						tabIndex="0"
						ref={ref}
						className="text-xl font-light leading-relaxed"
						variants={fadeInLeft}
						initial="initial"
						animate={isInView ? "animate" : "initial"}
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
					</m.div>
				</div>
				{/* <TimeLine /> */}
			</section>
		</LazyMotion>
	);
}
