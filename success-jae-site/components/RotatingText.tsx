'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function RotatingText({ words }: { words: readonly string[] }) {
	const [index, setIndex] = useState(0);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (reduceMotion) return;
		const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
		return () => clearInterval(id);
	}, [words.length, reduceMotion]);

	return (
		<span className="relative inline-flex h-[1.4em] min-w-[11ch] overflow-hidden align-bottom">
			<AnimatePresence mode="wait">
				<motion.span
					key={words[index]}
					initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={reduceMotion ? undefined : { y: '-100%', opacity: 0 }}
					transition={{ duration: 0.45, ease: [0.21, 0.65, 0.36, 1] }}
					className="text-gradient-gold whitespace-nowrap font-semibold"
				>
					{words[index]}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
