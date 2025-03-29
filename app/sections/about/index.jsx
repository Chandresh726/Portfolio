"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { HeadingDivider } from "components";
import Image from "next/image";

const fadeInLeft = {
  initial: { x: -200, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1], delay: 0.5 }
};

const fadeInRight = {
  initial: { x: 200, opacity: 0 },
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
				<div className="pt-10 pb-10 flex flex-col md:flex-row items-center">
					<m.div
						className="w-full md:w-1/3 flex justify-center"
						variants={fadeInLeft}
						initial="initial"
						animate={isInView ? "animate" : "initial"}
					>
						<Image
							src="/images/about-pic.jpg"
							width={300}
							height={400}
							alt="About me image"
							className="rounded-lg shadow-lg"
							priority
						/>
					</m.div>
					<m.div
						tabIndex="0"
						ref={ref}
						className="w-full md:w-2/3 text-xl font-light leading-relaxed"
						variants={fadeInRight}
						initial="initial"
						animate={isInView ? "animate" : "initial"}
					>
						<p>
							I&apos;m <span className="font-medium text-primary-color">Chandresh Kumar</span>, a software engineer who loves coding. My journey in tech began during my Computer Science 
							studies at <a href="https://kmit.in" target="_blank" rel="noopener noreferrer" className="text-primary-color hover:underline">KMIT</a>, where I earned a 
							GPA of <span className="font-medium text-primary-color">8.0</span>. Over the years, I&apos;ve grown 
							into a versatile developer working on both <span className="font-medium text-primary-color">traditional web</span> and <span className="font-medium text-primary-color">blockchain</span> projects.
						</p>
						<p className="my-3.5">
							As a <span className="font-medium text-primary-color">freelancer</span>, I enjoy working with clients to bring their ideas to life. Whether it&apos;s creating user-friendly 
							websites or exploring the exciting world of <span className="font-medium text-primary-color">Web3</span>, I&apos;m always eager to learn and adapt to new challenges. This 
							mix of experiences has taught me to approach problems with creativity and precision.
						</p>
						<p className="my-3.5">
							Outside of coding, I enjoy solving problems and staying active in the developer community. When I&apos;m not building 
							digital solutions, I like to spend time outdoors, play video games, or relax with a good movie and music.
						</p>
					</m.div>
				</div>
			</section>
		</LazyMotion>
	);
}
