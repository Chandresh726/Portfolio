import { Suspense, useRef } from "react";
import { domAnimation, LazyMotion, m, useInView } from "framer-motion";
import Link from "next/link";
import { HeadingDivider, Loader } from "components";
import Error from "../../error";
import { ErrorBoundary } from "react-error-boundary";
import { Projects } from "../../projects/components/Projects";
import { SITE_ROUTES, PROJECTS } from "../../../constants";

const fadeInUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
};

export function ProjectsSection() {
	const btnRef = useRef(null);
	const isBtnInView = useInView(btnRef, { once: true });

	return (	
		<LazyMotion features={domAnimation}>
			<m.section 
				id="projects" 
				className="section"
				variants={{
					hidden: { opacity: 0 },
					show: { opacity: 1, transition: { staggerChildren: 0.25 } }
				}}
				initial="hidden"
				animate="show"
			>
				<HeadingDivider title="Projects" />
				<div className="h-10 md:h-14" />

				<div className="flex flex-col items-center gap-8 md:gap-14">
					<Suspense
						fallback={
							<div className="flex-center">
								<Loader />
							</div>
						}
					>
						<ErrorBoundary FallbackComponent={Error}>
							<Projects projects={PROJECTS} limit={3}/>
						</ErrorBoundary>
					</Suspense>

					<m.div
						ref={btnRef}
						variants={fadeInUp}
						initial="initial"
						animate={isBtnInView ? "animate" : "initial"}
					>
						<Link
							href={SITE_ROUTES.projects}
							tabIndex={-1}
							aria-label="Go to projects page"
							className="btn"
						>
							<button aria-label="See more projects">More projects</button>
						</Link>
					</m.div>
				</div>
			</m.section>
		</LazyMotion>
	);
}
