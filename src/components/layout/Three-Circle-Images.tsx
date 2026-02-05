// No React import needed with the JSX runtime

type Size = number | string;

function toCssSize(size: Size): string {
	return typeof size === "number" ? `${size}px` : size;
}

export type ThreeCircleImagesProps = {
	leftSrc?: string;
	centerSrc?: string;
	rightSrc?: string;
	centerSize?: Size; // e.g., 320 or "20rem"
	sideSize?: Size;   // e.g., 200 or "12rem"
	containerHeight?: Size; // e.g., 360 or "24rem"
	className?: string;
	onLeftClick?: () => unknown;
	onCenterClick?: () => unknown;
	onRightClick?: () => unknown;
};

export function ThreeCircleImages({
	leftSrc = "https://placehold.co/200x200/png",
	centerSrc = "https://placehold.co/320x320/png",
	rightSrc = "https://placehold.co/200x200/png",
	centerSize = 280,
	sideSize = 200  ,
	containerHeight = 360,
	className = "",
	onLeftClick,
	onCenterClick,
	onRightClick,
}: ThreeCircleImagesProps) {
	const centerWH = { width: toCssSize(centerSize), height: toCssSize(centerSize) };
	const sideWH = { width: toCssSize(sideSize), height: toCssSize(sideSize) };

	return (
		<div
			className={`relative w-full max-w-5xl mx-auto ${className}`}
			style={{ height: toCssSize(containerHeight) }}
		>
			{/* Left circle (smaller, slightly behind) */}
			<button
				type="button"
				aria-label="Open left image"
				className="absolute left-[6%] md:left-[10%] top-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-xl ring-1 ring-white/30 z-0 translate-x-2 focus:outline-none cursor-pointer"
				style={sideWH}
				onClick={onLeftClick}
			>
				<img src={leftSrc} alt="" className="w-full h-full object-cover" />
			</button>

			{/* Center circle (largest, on top) */}
			<button
				type="button"
				aria-label="Open center image"
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-2xl ring-2 ring-white/50 z-10 focus:outline-none  cursor-pointer"
				style={centerWH}
				onClick={onCenterClick}
			>
				<img src={centerSrc} alt="" className="w-full h-full object-cover" />
			</button>

			{/* Right circle (smaller, slightly behind) */}
			<button
				type="button"
				aria-label="Open right image"
				className="absolute right-[6%] md:right-[10%] top-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-xl ring-1 ring-white/30 z-0 -translate-x-2 focus:outline-none  cursor-pointer"
				style={sideWH}
				onClick={onRightClick}
			>
				<img src={rightSrc} alt="" className="w-full h-full object-cover" />
			</button>
		</div>
	);
}

