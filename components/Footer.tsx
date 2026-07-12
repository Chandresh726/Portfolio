import { ConnectMedia } from "components/ConnectMedia";
import { ScrollTop } from "components/ScrollTop";

export function AppFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="w-full py-4 mt-2 animate-section-in">
			<div className="container-md">
				<div className="border-t border-divider pt-4" />
				<div className="flex flex-row justify-between items-center">
					<div className="flex-1 flex justify-start">
						<ConnectMedia />
					</div>
					<div className="hidden md:flex flex-1 justify-center">
						<ScrollTop />
					</div>
					<div className="flex-1 flex flex-col items-end gap-2">
						<p className="font-light">Copyright &copy; {year}</p>
						<div className="hidden md:flex gap-4 text-sm text-text-muted">
							<a href="/sitemap.xml" className="hover:text-on-surface transition-colors">
								Sitemap
							</a>
							<span>•</span>
							<a href="/rss.xml" className="hover:text-on-surface transition-colors">
								RSS
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
