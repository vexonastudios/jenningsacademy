export const SHAPES_CURRICULUM = [
  {
    id: "circle",
    name: "Circle",
    attributes: "it is perfectly round and has zero corners",
    colorClass: "text-sky-500",
    bgClass: "bg-sky-500",
    lightBgClass: "bg-sky-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <circle cx="50" cy="50" r="45" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "square",
    name: "Square",
    attributes: "it has four equal sides and four sharp corners",
    colorClass: "text-rose-500",
    bgClass: "bg-rose-500",
    lightBgClass: "bg-rose-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <rect x="10" y="10" width="80" height="80" rx="8" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "triangle",
    name: "Triangle",
    attributes: "it has three sides and three pointy corners",
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-500",
    lightBgClass: "bg-emerald-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <path d="M50 10 L90 90 L10 90 Z" fill="currentColor" strokeLinejoin="round" strokeWidth="6" stroke="currentColor"/>
      </svg>
    )
  },
  {
    id: "rectangle",
    name: "Rectangle",
    attributes: "it has four sides... two are very long, and two are short",
    colorClass: "text-amber-500",
    bgClass: "bg-amber-500",
    lightBgClass: "bg-amber-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <rect x="10" y="25" width="80" height="50" rx="6" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "oval",
    name: "Oval",
    attributes: "it is round but stretched out, like an egg",
    colorClass: "text-purple-500",
    bgClass: "bg-purple-500",
    lightBgClass: "bg-purple-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <ellipse cx="50" cy="50" rx="45" ry="28" fill="currentColor" />
      </svg>
    )
  }
];
