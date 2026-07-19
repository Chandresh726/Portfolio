"use client";

import { createContext, useContext, type ReactNode } from "react";

const ProjectVisibilityContext = createContext(true);

export function ProjectVisibilityProvider({
	visible,
	children
}: {
	visible: boolean;
	children: ReactNode;
}) {
	return (
		<ProjectVisibilityContext.Provider value={visible}>
			{children}
		</ProjectVisibilityContext.Provider>
	);
}

export function useProjectVisibility() {
	return useContext(ProjectVisibilityContext);
}
