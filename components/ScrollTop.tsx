import { IoIosArrowDropup } from "react-icons/io";

export function ScrollTop() {
	return (
		<a href="#main-content" aria-label="Scroll to top" className="relative flex group">
			<IoIosArrowDropup size={28} />
			<span
				className="group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-surface-overlay text-sm text-on-surface-overlay rounded-md absolute left-1/2
	    -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto px-2 w-max"
			>
				Scroll to top
			</span>
		</a>
	);
}
