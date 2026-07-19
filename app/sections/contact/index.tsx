import Image from "next/image";
import personalData from "content/personal.json";
import { Reveal } from "components/motion/reveal";

export function ContactSection() {
	return (
		<section id="contact" aria-labelledby="contact-heading" className="section">
			<h2 id="contact-heading" className="sr-only">
				Contact
			</h2>
			<Reveal>
				<address className="not-italic rounded-2xl border border-outline/30 bg-surface-variant/50 backdrop-blur-sm p-5 md:p-6 text-center w-full">
					<p className="text-base sm:text-lg lg:text-xl text-text-muted italic mb-4">
						I&apos;d love to hear from you.
					</p>
					<a
						href={`mailto:${personalData.email}`}
						className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-light/10 border border-blue-light/30 text-blue-light font-medium transition-[background-color,border-color,box-shadow] duration-300 hover:bg-blue-light/20 hover:border-blue-light/50 hover:shadow-lg"
					>
						<span className="relative size-8 rounded-full overflow-hidden" aria-hidden="true">
							<Image src="/avatar.webp" alt="" fill sizes="32px" className="object-cover" />
						</span>
						Let&apos;s talk
					</a>
				</address>
			</Reveal>
		</section>
	);
}
