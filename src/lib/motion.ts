import type { Variants } from "framer-motion";

export const motionTokens = {
  duration: { fast: 0.22, normal: 0.55, slow: 0.9, cinematic: 1.25 },
  ease: { standard: [0.22, 1, 0.36, 1] as const, soft: [0.16, 1, 0.3, 1] as const },
  distance: { small: 12, normal: 24, large: 42 },
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.normal, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: motionTokens.duration.slow, ease: motionTokens.ease.standard } },
};
export const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(9px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: motionTokens.duration.cinematic, ease: motionTokens.ease.soft } },
};
export const staggerVariants: Variants = { visible: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } } };
