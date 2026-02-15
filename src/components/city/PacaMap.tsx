"use client";

import { motion } from "framer-motion";

interface PacaMapProps {
  activeLat?: number;
  activeLng?: number;
  activeName?: string;
  cities?: { name: string; slug: string; latitude: number; longitude: number }[];
}

const MAP_BOUNDS = {
  minLat: 42.9,
  maxLat: 46.0,
  minLng: 3.5,
  maxLng: 7.8,
};

const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

function latLngToSvg(lat: number, lng: number) {
  const x =
    ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) *
    SVG_WIDTH;
  const y =
    ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) *
    SVG_HEIGHT;
  return { x, y };
}

const AGENCY = { lat: 43.4545, lng: 5.4694 };

export default function PacaMap({
  activeLat,
  activeLng,
  activeName,
  cities = [],
}: PacaMapProps) {
  const agencyPos = latLngToSvg(AGENCY.lat, AGENCY.lng);
  const activePos =
    activeLat && activeLng ? latLngToSvg(activeLat, activeLng) : null;

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="none" rx="16" />

        {/* Simplified PACA region shape */}
        <path
          d="M80,280 L100,240 L140,220 L160,180 L200,160 L220,130 L280,110 L320,100 L380,90 L420,100 L460,120 L500,140 L520,180 L530,220 L510,260 L480,280 L440,300 L400,310 L360,320 L320,310 L280,300 L240,290 L200,285 L160,280 L120,280 Z"
          fill="rgba(var(--color-accent-rgb, 200 170 110), 0.06)"
          stroke="rgba(var(--color-accent-rgb, 200 170 110), 0.2)"
          strokeWidth="1.5"
        />

        <text
          x="350"
          y="360"
          fill="rgba(255,255,255,0.1)"
          fontSize="12"
          fontStyle="italic"
          textAnchor="middle"
        >
          Mer Méditerranée
        </text>

        {/* Connection line from agency to active city */}
        {activePos && (
          <motion.line
            x1={agencyPos.x}
            y1={agencyPos.y}
            x2={activePos.x}
            y2={activePos.y}
            stroke="rgba(var(--color-accent-rgb, 200 170 110), 0.3)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        )}

        {/* Other city dots */}
        {cities.map((city) => {
          const pos = latLngToSvg(city.latitude, city.longitude);
          const isActive =
            city.latitude === activeLat && city.longitude === activeLng;
          if (isActive) return null;

          return (
            <g key={city.slug}>
              <circle cx={pos.x} cy={pos.y} r="4" fill="rgba(255,255,255,0.2)" />
              <text
                x={pos.x}
                y={pos.y - 10}
                fill="rgba(255,255,255,0.2)"
                fontSize="9"
                textAnchor="middle"
              >
                {city.name}
              </text>
            </g>
          );
        })}

        {/* Agency pin (Gardanne) */}
        <g>
          <motion.circle
            cx={agencyPos.x}
            cy={agencyPos.y}
            r="8"
            fill="rgba(var(--color-accent-rgb, 200 170 110), 0.2)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx={agencyPos.x} cy={agencyPos.y} r="5" className="fill-accent" />
          <text
            x={agencyPos.x}
            y={agencyPos.y - 14}
            className="fill-accent"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
          >
            Agence HDS
          </text>
        </g>

        {/* Active city pin */}
        {activePos && (
          <g>
            <motion.circle
              cx={activePos.x}
              cy={activePos.y}
              r="10"
              fill="rgba(var(--color-accent-rgb, 200 170 110), 0.15)"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.8, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <circle
              cx={activePos.x}
              cy={activePos.y}
              r="6"
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
            {activeName && (
              <text
                x={activePos.x}
                y={activePos.y - 16}
                fill="white"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                {activeName}
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
