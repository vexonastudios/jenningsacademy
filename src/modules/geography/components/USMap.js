"use client";

import USA from "@svg-maps/usa";
import { useCallback } from "react";

/**
 * Interactive SVG US Map.
 * @param {Array<string>} highlightIds - Array of lowercase state IDs to highlight brightly (e.g. ['tx']).
 * @param {Array<string>} dimIds - Array of lowercase state IDs that should be dimmed out (not part of current test).
 * @param {string} mode - "learn" or "test".
 * @param {Function} onLocationClick - Triggered with the internal USA.locations object: {id, name, path}.
 */
export default function USMap({ 
  highlightIds = [], 
  dimIds = [], 
  mode = "learn", 
  onLocationClick = () => {} 
}) {
  const handlePathClick = useCallback((location) => {
    onLocationClick(location);
  }, [onLocationClick]);

  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg 
        viewBox={USA.viewBox} 
        className="w-full max-h-[60vh] md:max-h-[70vh] drop-shadow-sm transition-all"
        aria-label={USA.label}
      >
        {USA.locations.map((location) => {
          const isHighlighted = highlightIds.includes(location.id);
          const isDim = dimIds.includes(location.id);
          
          let fillColor = mode === "test" ? "#cbd5e1" : "#e2e8f0"; // slate-300 or slate-200
          let strokeColor = "#ffffff";
          let strokeWidth = "1";
          let cursor = "pointer";

          if (isDim) {
            fillColor = "#f1f5f9"; // slate-100 very dim
            strokeColor = "#ffffff";
            cursor = "default";
          }

          if (isHighlighted) {
            fillColor = "#6366f1"; // indigo-500
            strokeColor = "#4f46e5";
            strokeWidth = "2";
          }

          return (
            <path
              key={location.id}
              id={location.id}
              name={location.name}
              d={location.path}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300"
              style={{ cursor }}
              onClick={() => handlePathClick(location)}
              onMouseEnter={(e) => {
                if (!isDim) {
                  e.target.style.opacity = "0.8";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
