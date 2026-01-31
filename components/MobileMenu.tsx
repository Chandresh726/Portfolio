"use client";

import { useEffect, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { ConnectMedia, Menu } from "components";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

export function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const onClose = () => setIsOpen(false);
	const onOpen = () => setIsOpen(true);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "auto";
	}, [isOpen]);

	return (
		<>
			<motion.button
				className="p-2"
				onClick={onOpen}
				title="Open menu"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 1 }}
				aria-label="Mobile navigation"
			>
				<BsGrid />
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="backdrop-blur-md fixed left-0 right-0 top-0 min-h-screen z-50"
						initial={{ y: "100%" }}
						animate={{ y: "0%" }}
						exit={{ y: "100%" }}
					>
						<header className="p-6 flex items-center justify-between border-b border-b-brand-light z-10">
							<ConnectMedia />
							<button
								onClick={onClose}
								className="w-10 h-10 inline-flex items-center justify-center"
								aria-label="Close menu"
							>
								<IoMdClose size="24" />
							</button>
						</header>
						<div className="px-6 py-10">
							<Menu onClick={onClose} />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
