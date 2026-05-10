"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { COUNTRIES, VISITED_ISOS, type Country } from "@/lib/travel";
import { useT, type Locale } from "@/lib/i18n";

// World topojson from world-atlas (lightweight 110m resolution)
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Props = {
  activeSlug: string;
  onSelect: (slug: string) => void;
};

export function WorldMap({ activeSlug, onSelect }: Props) {
  const { locale } = useT();
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    country: Country;
  } | null>(null);

  const active = COUNTRIES.find((c) => c.slug === activeSlug);
  const activeIso = active?.iso;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-default bg-subtle">
      <ComposableMap
        projectionConfig={{
          scale: 155,
          center: [15, 30],
        }}
        width={900}
        height={440}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const iso = geo.id as string;
              const visited = VISITED_ISOS.has(iso);
              const isActive = iso === activeIso;
              const country = COUNTRIES.find((c) => c.iso === iso);

              const fill = isActive
                ? "var(--accent)"
                : visited
                ? "var(--accent)"
                : "var(--border)";
              const opacity = isActive ? 1 : visited ? 0.35 : 1;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    if (!country) return;
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      country,
                    });
                  }}
                  onMouseMove={(e) => {
                    if (!country) return;
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      country,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => {
                    if (country) onSelect(country.slug);
                  }}
                  style={{
                    default: {
                      fill,
                      fillOpacity: opacity,
                      stroke: "var(--bg)",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: visited ? "pointer" : "default",
                      transition: "fill-opacity 160ms ease, fill 160ms ease",
                    },
                    hover: {
                      fill: visited ? "var(--accent)" : "var(--border-strong)",
                      fillOpacity: visited ? (isActive ? 1 : 0.65) : 1,
                      stroke: "var(--bg)",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: visited ? "pointer" : "default",
                    },
                    pressed: {
                      fill: "var(--accent)",
                      fillOpacity: 1,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-3 rounded-full border border-default bg-[var(--bg)]/85 px-3 py-1 text-[11px] text-muted backdrop-blur">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          {COUNTRIES.length} {labels(locale).visited}
        </span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 14,
            top: tooltip.y + 14,
            pointerEvents: "none",
          }}
          className="z-50 rounded-lg border border-default bg-[var(--bg)] px-2.5 py-1.5 text-xs shadow-cardHover"
        >
          <span className="mr-1.5">{tooltip.country.flag}</span>
          <span className="font-medium">
            {tooltip.country.names[locale]}
          </span>
          <span className="num ml-2 text-faint">· {tooltip.country.year}</span>
        </div>
      )}
    </div>
  );
}

function labels(locale: Locale) {
  const m = {
    en: { visited: "visited" },
    tr: { visited: "ülke" },
    de: { visited: "besucht" },
  } as const;
  return m[locale];
}
