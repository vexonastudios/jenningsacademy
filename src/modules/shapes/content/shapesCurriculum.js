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
  },
  {
    id: "pentagon",
    name: "Pentagon",
    attributes: "it has exactly five sides and five corners",
    colorClass: "text-indigo-500",
    bgClass: "bg-indigo-500",
    lightBgClass: "bg-indigo-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <polygon points="50,5 95,38 78,95 22,95 5,38" strokeLinejoin="round" strokeWidth="4" stroke="currentColor" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "hexagon",
    name: "Hexagon",
    attributes: "it has six sides, like a honey bee's honeycomb",
    colorClass: "text-orange-500",
    bgClass: "bg-orange-500",
    lightBgClass: "bg-orange-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" strokeLinejoin="round" strokeWidth="4" stroke="currentColor" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "octagon",
    name: "Octagon",
    attributes: "it has eight sides, just like a stop sign",
    colorClass: "text-red-500",
    bgClass: "bg-red-500",
    lightBgClass: "bg-red-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" strokeLinejoin="round" strokeWidth="4" stroke="currentColor" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "star",
    name: "Star",
    attributes: "it has five points that twinkle and shine",
    colorClass: "text-yellow-400",
    bgClass: "bg-yellow-400",
    lightBgClass: "bg-yellow-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <polygon points="50,5 61,35 95,35 68,55 79,88 50,68 21,88 32,55 5,35 39,35" strokeLinejoin="round" strokeWidth="4" stroke="currentColor" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "heart",
    name: "Heart",
    attributes: "it is curvy on top and points down like a valentine",
    colorClass: "text-pink-500",
    bgClass: "bg-pink-500",
    lightBgClass: "bg-pink-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <path d="M50 88 C 50 88 10 55 10 30 C 10 15 25 5 40 10 C 45 12 50 20 50 20 C 50 20 55 12 60 10 C 75 5 90 15 90 30 C 90 55 50 88 50 88 Z" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "rhombus",
    name: "Rhombus",
    attributes: "it looks like a diamond or a slanted square",
    colorClass: "text-cyan-500",
    bgClass: "bg-cyan-500",
    lightBgClass: "bg-cyan-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <polygon points="50,5 95,50 50,95 5,50" strokeLinejoin="round" strokeWidth="4" stroke="currentColor" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "crescent",
    name: "Crescent",
    attributes: "it is curved like a beautiful moon in the sky",
    colorClass: "text-slate-400",
    bgClass: "bg-slate-400",
    lightBgClass: "bg-slate-100",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <path d="M60 5 A45 45 0 1 0 95 65 A35 35 0 1 1 60 5 Z" fill="currentColor" />
      </svg>
    )
  }
];
