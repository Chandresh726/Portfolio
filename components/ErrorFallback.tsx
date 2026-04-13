"use client";

import type { ErrorFallbackProps } from "types";

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
	const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";

	return (
		<div className="h-full w-full flex-center flex-col gap-5">
			<p className="text-3xl text-red-500">Something went wrong!</p>
			<p className="text-red-500">{errorMessage}</p>
			<button className="btn" onClick={resetErrorBoundary}>
				Retry
			</button>
		</div>
	);
}
