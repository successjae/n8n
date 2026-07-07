'use client';

import { useEffect, useRef } from 'react';

interface Node {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	pulse: number;
	pulseSpeed: number;
	gold: boolean;
}

const NODE_DENSITY = 1 / 22000; // nodes per px² — tuned to stay light
const MAX_NODES = 90;
const LINK_DISTANCE = 170;

/**
 * Cinematic AI-network hero background: drifting glowing nodes, connection
 * lines, a faint grid, and slow pulsing light. Pauses for reduced motion and
 * when the tab is hidden.
 */
export default function NetworkCanvas({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let nodes: Node[] = [];
		let raf = 0;
		let width = 0;
		let height = 0;
		let dpr = 1;
		let time = 0;

		const seed = () => {
			const count = Math.min(MAX_NODES, Math.round(width * height * NODE_DENSITY));
			nodes = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.22,
				vy: (Math.random() - 0.5) * 0.22,
				radius: 1 + Math.random() * 1.8,
				pulse: Math.random() * Math.PI * 2,
				pulseSpeed: 0.008 + Math.random() * 0.014,
				gold: Math.random() < 0.28,
			}));
		};

		const resize = () => {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			seed();
		};

		const drawGrid = () => {
			const gap = 90;
			ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)';
			ctx.lineWidth = 1;
			ctx.beginPath();
			for (let x = 0; x <= width; x += gap) {
				ctx.moveTo(x, 0);
				ctx.lineTo(x, height);
			}
			for (let y = 0; y <= height; y += gap) {
				ctx.moveTo(0, y);
				ctx.lineTo(width, y);
			}
			ctx.stroke();
		};

		const draw = () => {
			time += 1;
			ctx.clearRect(0, 0, width, height);
			drawGrid();

			// connection lines
			for (let i = 0; i < nodes.length; i++) {
				const a = nodes[i];
				for (let j = i + 1; j < nodes.length; j++) {
					const b = nodes[j];
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const dist = Math.hypot(dx, dy);
					if (dist < LINK_DISTANCE) {
						const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
						ctx.strokeStyle =
							a.gold && b.gold
								? `rgba(212, 169, 78, ${alpha})`
								: `rgba(56, 189, 248, ${alpha * 0.8})`;
						ctx.lineWidth = 0.7;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}

			// nodes with pulsing glow
			for (const node of nodes) {
				node.x += node.vx;
				node.y += node.vy;
				node.pulse += node.pulseSpeed;
				if (node.x < -20) node.x = width + 20;
				if (node.x > width + 20) node.x = -20;
				if (node.y < -20) node.y = height + 20;
				if (node.y > height + 20) node.y = -20;

				const glow = 0.55 + Math.sin(node.pulse) * 0.45;
				const color = node.gold ? '212, 169, 78' : '56, 189, 248';

				const gradient = ctx.createRadialGradient(
					node.x,
					node.y,
					0,
					node.x,
					node.y,
					node.radius * 8,
				);
				gradient.addColorStop(0, `rgba(${color}, ${0.35 * glow})`);
				gradient.addColorStop(1, `rgba(${color}, 0)`);
				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(node.x, node.y, node.radius * 8, 0, Math.PI * 2);
				ctx.fill();

				ctx.fillStyle = `rgba(${color}, ${0.5 + 0.5 * glow})`;
				ctx.beginPath();
				ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
				ctx.fill();
			}

			// slow travelling light along a workflow path
			const t = (time % 900) / 900;
			const px = width * t;
			const py = height * 0.35 + Math.sin(t * Math.PI * 4) * height * 0.12;
			const travel = ctx.createRadialGradient(px, py, 0, px, py, 60);
			travel.addColorStop(0, 'rgba(212, 169, 78, 0.14)');
			travel.addColorStop(1, 'rgba(212, 169, 78, 0)');
			ctx.fillStyle = travel;
			ctx.beginPath();
			ctx.arc(px, py, 60, 0, Math.PI * 2);
			ctx.fill();

			raf = requestAnimationFrame(draw);
		};

		resize();
		if (reduceMotion) {
			// static single frame keeps the aesthetic without motion
			drawGrid();
		} else {
			raf = requestAnimationFrame(draw);
		}

		const onVisibility = () => {
			if (reduceMotion) return;
			if (document.hidden) {
				cancelAnimationFrame(raf);
			} else {
				raf = requestAnimationFrame(draw);
			}
		};

		window.addEventListener('resize', resize);
		document.addEventListener('visibilitychange', onVisibility);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	}, []);

	return <canvas ref={canvasRef} className={className} aria-hidden />;
}
