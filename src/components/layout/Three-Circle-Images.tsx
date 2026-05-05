import type { RefObject } from 'react'

type Size = number | string;

function toCssSize(size: Size): string {
  return typeof size === "number" ? `${size}px` : size;
}

export type ThreeCircleImagesProps = {
  leftSrc?: string;
  centerSrc?: string;
  rightSrc?: string;
  centerSize?: Size;
  sideSize?: Size;
  containerHeight?: Size;
  className?: string;
  onLeftClick?: () => void;
  onCenterClick?: () => void;
  onRightClick?: () => void;
  onLeftEnter?: () => void;
  onLeftLeave?: () => void;
  onCenterEnter?: () => void;
  onCenterLeave?: () => void;
  onRightEnter?: () => void;
  onRightLeave?: () => void;
  leftLabel?: string;
  centerLabel?: string;
  rightLabel?: string;
  activeLabel?: string | null;
  leftRef?: RefObject<HTMLButtonElement | null>;
  centerRef?: RefObject<HTMLButtonElement | null>;
  rightRef?: RefObject<HTMLButtonElement | null>;
};

const LABEL_COLORS: Record<string, string> = {
  '1': '#F97316',
  '2': '#3B82F6',
  '3': '#10B981',
};

function CircleLabel({ label, isActive, anyActive }: { label: string; isActive: boolean; anyActive: boolean }) {
  return (
    <span
      className="absolute top-2 right-2 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center text-white pointer-events-none select-none z-10"
      style={{
        backgroundColor: LABEL_COLORS[label] ?? '#888',
        opacity: anyActive && !isActive ? 0.15 : 1,
        transform: isActive ? 'scale(1.3)' : 'scale(1)',
        transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: isActive ? `0 0 10px 3px ${LABEL_COLORS[label] ?? '#888'}55` : 'none',
      }}
    >
      {label}
    </span>
  );
}

export function ThreeCircleImages({
  leftSrc = 'https://placehold.co/200x200/png',
  centerSrc = 'https://placehold.co/320x320/png',
  rightSrc = 'https://placehold.co/200x200/png',
  centerSize = 280,
  sideSize = 200,
  containerHeight = 360,
  className = '',
  onLeftClick,
  onCenterClick,
  onRightClick,
  onLeftEnter,
  onLeftLeave,
  onCenterEnter,
  onCenterLeave,
  onRightEnter,
  onRightLeave,
  leftLabel,
  centerLabel,
  rightLabel,
  activeLabel,
  leftRef,
  centerRef,
  rightRef,
}: ThreeCircleImagesProps) {
  const centerWH = { width: toCssSize(centerSize), height: toCssSize(centerSize) };
  const sideWH = { width: toCssSize(sideSize), height: toCssSize(sideSize) };
  const anyActive = Boolean(activeLabel);

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto ${className}`}
      style={{ height: toCssSize(containerHeight) }}
    >
      {/* Left circle */}
      <button
        ref={leftRef}
        type="button"
        aria-label="Open left image"
        className="absolute left-[6%] md:left-[10%] top-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-xl ring-1 ring-white/30 z-0 translate-x-2 focus:outline-none cursor-pointer transition-opacity duration-200"
        style={{ ...sideWH, opacity: anyActive && activeLabel !== leftLabel ? 0.2 : 1 }}
        onClick={onLeftClick}
        onMouseEnter={onLeftEnter}
        onMouseLeave={onLeftLeave}
      >
        <img src={leftSrc} alt="" className="w-full h-full object-cover" />
        {leftLabel && (
          <CircleLabel label={leftLabel} isActive={activeLabel === leftLabel} anyActive={anyActive} />
        )}
      </button>

      {/* Center circle */}
      <button
        ref={centerRef}
        type="button"
        aria-label="Open center image"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-2xl ring-2 ring-white/50 z-10 focus:outline-none cursor-pointer transition-opacity duration-200"
        style={{ ...centerWH, opacity: anyActive && activeLabel !== centerLabel ? 0.2 : 1 }}
        onClick={onCenterClick}
        onMouseEnter={onCenterEnter}
        onMouseLeave={onCenterLeave}
      >
        <img src={centerSrc} alt="" className="w-full h-full object-cover" />
        {centerLabel && (
          <CircleLabel label={centerLabel} isActive={activeLabel === centerLabel} anyActive={anyActive} />
        )}
      </button>

      {/* Right circle */}
      <button
        ref={rightRef}
        type="button"
        aria-label="Open right image"
        className="absolute right-[6%] md:right-[10%] top-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-xl ring-1 ring-white/30 z-0 -translate-x-2 focus:outline-none cursor-pointer transition-opacity duration-200"
        style={{ ...sideWH, opacity: anyActive && activeLabel !== rightLabel ? 0.2 : 1 }}
        onClick={onRightClick}
        onMouseEnter={onRightEnter}
        onMouseLeave={onRightLeave}
      >
        <img src={rightSrc} alt="" className="w-full h-full object-cover" />
        {rightLabel && (
          <CircleLabel label={rightLabel} isActive={activeLabel === rightLabel} anyActive={anyActive} />
        )}
      </button>
    </div>
  );
}
