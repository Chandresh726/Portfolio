import type { TargetAndTransition, Transition } from "framer-motion";

export const initial: TargetAndTransition = { opacity: 0 };
export const animate: TargetAndTransition = { opacity: 1 };
export const exit: TargetAndTransition = { opacity: 0 };
export const transition: Transition = { delay: 1 };
export const initialMobile: TargetAndTransition = { y: "100%" };
export const animateMobile: TargetAndTransition = { y: "0%" };
export const exitMobile: TargetAndTransition = { y: "100%" };
