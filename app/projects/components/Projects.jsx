import { m, LazyMotion, domAnimation } from "framer-motion";
import { ProjectItem } from "../../sections/project/ProjectItem";

const containerVariants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export function Projects({ projects, limit, category }) {
  const filteredProjects = category 
    ? projects?.filter((project) => project.stack.includes(category))
    : projects;

  if (!filteredProjects || filteredProjects.length === 0) {
    return (
      <div className="flex-center">
        <h3 className="text-2xl">No projects found</h3>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full"
        variants={containerVariants}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
        {filteredProjects
          .slice(0, limit || filteredProjects.length)
          .map((project, index) => (
            <ProjectItem key={project.title || index} project={project} />
          ))}
      </m.div>
    </LazyMotion>
  );
}
