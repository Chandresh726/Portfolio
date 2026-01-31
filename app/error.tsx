"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { ErrorProps } from "types";

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error("Error:", error);
	}, [error]);

	return (
		<div className="min-h-[60vh] w-full flex-center flex-col gap-6 px-4">
			<div className="text-center space-y-4">
				<div className="text-6xl">!</div>
				<h1 className="text-3xl font-bold text-red-500">Something went wrong</h1>
				<p className="text-text-muted max-w-md">
					We encountered an unexpected error. Please try again or return to the home page.
				</p>
				{process.env.NODE_ENV === "development" && (
					<details className="mt-4 text-left bg-surface-muted p-4 rounded-lg max-w-lg mx-auto">
						<summary className="cursor-pointer text-sm font-medium">Error details</summary>
						<pre className="mt-2 text-xs overflow-auto text-red-500">
							{error.message}
							{error.stack && `\n\n${error.stack}`}
						</pre>
					</details>
				)}
			</div>
			<div className="flex gap-4">
				<button className="btn" onClick={() => reset()} aria-label="Try again">
					Try again
				</button>
				<Link href="/" className="btn bg-gray-600 hover:bg-gray-700" aria-label="Go to home page">
					Go home
				</Link>
			</div>
		</div>
	);
}
