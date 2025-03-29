"use client";

import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HeadingDivider, Loader } from "components";
import { Filter } from "./components/Filter";
import Error from "../error";
import { Projects } from "./components/Projects";
import { PROJECTS } from "../../constants";

export default function Page() {
  const [category, setCategory] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(false);
  }, []);

  const onClick = (catName) => setCategory(catName);

  if (isLoading) {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container-md">
      <section id="projects" className="section">
        <HeadingDivider title="Projects" />
        <Filter onClick={onClick} />
        <ErrorBoundary FallbackComponent={Error}>
          <Projects projects={PROJECTS} category={category}/>
        </ErrorBoundary>
      </section>
    </div>
  );
}
