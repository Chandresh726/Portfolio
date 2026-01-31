import type { LayoutProps } from "types";

export const metadata = {
	title: "Projects"
};

export default function Layout({ children }: LayoutProps) {
	return <div className="container-md min-h-screen">{children}</div>;
}
