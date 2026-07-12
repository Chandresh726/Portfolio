import Image from "next/image";
import personalData from "content/personal.json";

export function ContactSection() {
	return (
		<section id="contact" className="section">
			<div className="animate-section-in">
				<div className="rounded-2xl border border-outline/30 bg-surface-variant/50 backdrop-blur-sm p-5 md:p-6 text-center w-full">
					<p className="text-base sm:text-lg lg:text-xl text-text-muted italic mb-4">
						I&apos;d love to hear from you.
					</p>
					<a
						href={`mailto:${personalData.email}`}
						className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-light/10 border border-blue-light/30 text-blue-light font-medium transition-all duration-300 hover:bg-blue-light/20 hover:border-blue-light/50 hover:shadow-lg"
					>
						<div className="relative size-8 rounded-full overflow-hidden">
							<Image
								src="/favicon.png"
								alt="Chandresh Kumar"
								fill
								sizes="32px"
								className="object-cover"
							/>
						</div>
						Let&apos;s talk
					</a>
				</div>
			</div>
		</section>
	);
}
