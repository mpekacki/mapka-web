import React, { useRef, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from './icons';

interface BottomSheetProps {
  /** snap points as fractions of the viewport height, ascending */
  snapPoints?: number[];
  /** index into snapPoints to start at */
  initialSnap?: number;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  snapPoints = [0.2, 0.45, 0.92],
  initialSnap = 0,
  children,
}) => {
  const [snapIndex, setSnapIndex] = useState(initialSnap);
  const [dragHeight, setDragHeight] = useState<number | null>(null);
  const dragStart = useRef<{ y: number; height: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = {
      y: e.clientY,
      height: snapPoints[snapIndex] * window.innerHeight,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const height =
      dragStart.current.height + (dragStart.current.y - e.clientY);
    setDragHeight(Math.max(48, Math.min(window.innerHeight, height)));
  };

  const onPointerUp = () => {
    if (!dragStart.current) return;
    const height = dragHeight ?? dragStart.current.height;
    const heights = snapPoints.map((f) => f * window.innerHeight);
    let nearest = 0;
    heights.forEach((h, i) => {
      if (Math.abs(h - height) < Math.abs(heights[nearest] - height)) {
        nearest = i;
      }
    });
    setSnapIndex(nearest);
    setDragHeight(null);
    dragStart.current = null;
  };

  const isExpanded = snapIndex === snapPoints.length - 1;

  return (
    <div
      className={`bottom-sheet${
        dragHeight === null ? ' bottom-sheet-animated' : ''
      }`}
      style={{
        height:
          dragHeight !== null
            ? `${dragHeight}px`
            : `${snapPoints[snapIndex] * 100}dvh`,
      }}
    >
      <div
        className="bottom-sheet-handle"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="bottom-sheet-grip" />
        <button
          className="bottom-sheet-toggle"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          onClick={() =>
            setSnapIndex(isExpanded ? initialSnap : snapPoints.length - 1)
          }
        >
          {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </button>
      </div>
      <div className="bottom-sheet-content">{children}</div>
    </div>
  );
};

export default BottomSheet;
