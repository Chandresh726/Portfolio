"use client";

import type { ErrorFallbackProps } from "types";

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
	return (
		<div className="h-full w-full flex-center flex-col gap-5">
			<p className="text-3xl text-red-500">Something went wrong!</p>
			<p className="text-red-500">{error.message}</p>
			<button className="btn" onClick={resetErrorBoundary}>
				Retry
			</button>
		</div>
	);
}
