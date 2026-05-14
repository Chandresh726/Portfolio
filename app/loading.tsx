import { Loader } from "components";

export default function Loading() {
	return (
		<div className="flex-center flex-1 min-h-[60vh]">
			<Loader textClassNames="text-2xl text-center" />
		</div>
	);
}
