import { AiOutlineLoading } from "react-icons/ai";
import type { LoaderProps } from "types";

export function Loader({ textClassNames = "" }: LoaderProps) {
	return (
		<div className="flex-center flex-col gap-5 my-20">
			<div className="animate-spin">
				<AiOutlineLoading size={30} />
			</div>
			<p className={textClassNames}>Loading...</p>
		</div>
	);
}
