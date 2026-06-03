const LAYERS = [
  [{ x: 80,  y: 100 }, { x: 80,  y: 200 }, { x: 80,  y: 300 }, { x: 80,  y: 400 }],
  [{ x: 260, y: 70  }, { x: 260, y: 160 }, { x: 260, y: 250 }, { x: 260, y: 340 }, { x: 260, y: 430 }],
  [{ x: 500, y: 70  }, { x: 500, y: 160 }, { x: 500, y: 250 }, { x: 500, y: 340 }, { x: 500, y: 430 }],
  [{ x: 740, y: 100 }, { x: 740, y: 200 }, { x: 740, y: 300 }, { x: 740, y: 400 }],
  [{ x: 920, y: 165 }, { x: 920, y: 335 }],
];

const CONNECTIONS: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];
for (let l = 0; l < LAYERS.length - 1; l++) {
  for (const from of LAYERS[l]) {
    for (const to of LAYERS[l + 1]) {
      CONNECTIONS.push({ from, to });
    }
  }
}

const PULSES = CONNECTIONS.filter((_, i) => i % 4 === 0);
const ALL_NODES = LAYERS.flat();

export default function NeuralNetworkBg() {
  return (
    <svg
      viewBox="0 0 1000 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* Connection lines */}
      {CONNECTIONS.map((c, i) => (
        <line
          key={i}
          x1={c.from.x} y1={c.from.y}
          x2={c.to.x}   y2={c.to.y}
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity="0.07"
        />
      ))}

      {/* Traveling pulse dots */}
      {PULSES.map((c, i) => {
        const dur = `${1.6 + (i % 8) * 0.35}s`;
        const begin = `${(i * 0.55) % 5}s`;
        return (
          <circle key={i} r="2.5" fill="var(--accent)">
            <animate
              attributeName="opacity"
              values="0;0.8;0"
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
            />
            <animateMotion
              path={`M ${c.from.x} ${c.from.y} L ${c.to.x} ${c.to.y}`}
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* Nodes with slow pulse */}
      {ALL_NODES.map((node, i) => {
        const dur = `${2.2 + (i % 6) * 0.7}s`;
        const begin = `${(i * 0.25) % 3}s`;
        return (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r="3.5" fill="var(--accent)" opacity="0.18" />
            <circle cx={node.x} cy={node.y} r="3.5" fill="var(--accent)">
              <animate attributeName="r"       values="3.5;6;3.5"           dur={dur} begin={begin} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.18;0.35;0.18"      dur={dur} begin={begin} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
