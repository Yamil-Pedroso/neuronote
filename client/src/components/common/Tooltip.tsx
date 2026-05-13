import { useState, type ReactNode, type MouseEvent } from "react";
import { createPortal } from "react-dom";

type TooltipPosition = "top" | "right" | "bottom" | "left";

type TooltipProps = {
  content: string;
  children: ReactNode;
  position?: TooltipPosition;
};

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offset = 12;

    const nextCoords = {
      top: {
        top: rect.top - offset,
        left: rect.left + rect.width / 2,
      },
      bottom: {
        top: rect.bottom + offset,
        left: rect.left + rect.width / 2,
      },
      left: {
        top: rect.top + rect.height / 2,
        left: rect.left - offset,
      },
      right: {
        top: rect.top + rect.height / 2,
        left: rect.right + offset,
      },
    };

    setCoords(nextCoords[position]);
    setIsOpen(true);
  };

  const transformClasses: Record<TooltipPosition, string> = {
    top: "-translate-x-1/2 -translate-y-full",
    bottom: "-translate-x-1/2",
    left: "-translate-x-full -translate-y-1/2",
    right: "-translate-y-1/2",
  };

  const arrowClasses: Record<TooltipPosition, string> = {
    top: "left-1/2 top-full -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-[#1F1F1F]",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-[#1F1F1F]",
    left: "left-full top-1/2 -translate-y-1/2 border-y-8 border-l-8 border-y-transparent border-l-[#1F1F1F]",
    right:
      "right-full top-1/2 -translate-y-1/2 border-y-8 border-r-8 border-y-transparent border-r-[#1F1F1F]",
  };

  return (
    <>
      <div
        className="inline-flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>

      {isOpen &&
        createPortal(
          <div
            className={`pointer-events-none fixed z-[99999] rounded-xl bg-[#1F1F1F] px-3 py-2 text-sm font-black text-white shadow-[3px_3px_0_#A8D5BA] transition-all duration-200 ease-out ${transformClasses[position]}`}
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            {content}

            <span className={`absolute h-0 w-0 ${arrowClasses[position]}`} />
          </div>,
          document.body,
        )}
    </>
  );
}
