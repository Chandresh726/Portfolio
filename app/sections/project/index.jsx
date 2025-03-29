import { Suspense, useRef } from "react";
import { domAnimation, LazyMotion, m, useInView } from "framer-motion";
import Link from "next/link";
import { HeadingDivider, Loader } from "components";
import Error from "../../error";
import { ErrorBoundary } from "react-error-boundary";
import { Projects } from "../../projects/components/Projects";
import { SITE_ROUTES, PROJECTS } from "../../../constants";

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      <section id="projects" className="section">
        <HeadingDivider title="Projects" />
        <div ref={ref} className="flex flex-col items-center gap-8 md:gap-14 pt-10">
          <Suspense fallback={<div className="flex-center"><Loader /></div>}>
            <ErrorBoundary FallbackComponent={Error}>
              <Projects projects={PROJECTS} limit={3} />
            </ErrorBoundary>
          </Suspense>

          {isInView && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href={SITE_ROUTES.projects} className="btn" aria-label="See more projects">
                More projects
              </Link>
            </m.div>
          )}
        </div>
      </section>
    </LazyMotion>
  );
}
