import React, { useState } from "react";
import { Icon } from "../page";

// 1. Defining standard interface for your route stops data array
interface RouteMapProps {
  data?: readonly string[];
}

const RouteMap: React.FC<RouteMapProps> = ({ data = [] }) => {
  const [expanded, setExpanded] = useState(false);

  // Guard clause against empty or undefined data arrays to prevent app crashes
  if (!data || data.length === 0) {
    return null;
  }

  // Safely grab the stops between start and finish
  const middleStops = data.slice(1, -1);
  const hiddenCount = middleStops.length;

  return (
    <>
      <section className="py-8 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Route Map</h2>

        {/* Top visual graphic illustration block */}
        <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 h-64 mb-5">
          <svg viewBox="0 0 600 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 240 Q150 180 300 200 Q450 220 600 200 L600 240Z" fill="#d1fae5" opacity="0.5" />
            <path d="M50 240 Q120 160 200 180 Q280 200 350 140 Q420 80 500 120 Q560 150 600 130 L600 240Z" fill="#a7f3d0" opacity="0.35" />
            <polyline points="80,190 160,165 230,140 300,125 360,138 420,115 510,145" stroke="#E63946" strokeWidth="2.5" strokeDasharray="7 4" strokeLinecap="round" />
            {([
              [80, 190], [160, 165], [230, 140], [300, 125], [360, 138], [420, 115], [510, 145]
            ] as [number, number][]).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="5" fill="#E63946" stroke="white" strokeWidth="2" />
            ))}
          </svg>
          <button className="absolute bottom-3 right-3 bg-white/90 hover:bg-white border border-gray-200 hover:border-[#E63946] hover:text-[#E63946] text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors">
            <Icon.Map /> View Map
          </button>
        </div>

        {/* Dynamic Horizontal Timeline Sequence */}
        <div className="flex items-center w-full overflow-x-auto pb-1 gap-0">
          
          {/* Starting Destination Node */}
          <div className="flex-shrink-0 flex flex-col items-start pr-2">
            <div className="flex items-center gap-1 text-[#E63946] mb-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <span className="text-xs font-semibold">Starts</span>
            </div>
            <span className="text-xs text-gray-700 font-medium whitespace-nowrap">{data[0]}, Nepal</span>
          </div>

          {/* Interactive Middle Segment Connector Grid */}
          <div className="flex-1 flex items-center min-w-0">
            <div className="flex-1 border-t-2 border-dashed border-gray-300 min-w-[16px]" />
            {!expanded && hiddenCount > 0 ? (
              <button
                onClick={() => setExpanded(true)}
                className="flex-shrink-0 mx-3 text-xs font-semibold text-gray-600 border border-gray-300 hover:border-[#E63946] hover:text-[#E63946] px-3 py-1 rounded-full transition-colors whitespace-nowrap"
              >
                +{hiddenCount} More Destinations
              </button>
            ) : (
              <div className="flex items-center overflow-x-auto">
                {middleStops.map((stop, idx) => (
                  <div key={idx} className="flex items-center flex-shrink-0">
                    <div className="w-5 border-t-2 border-dashed border-gray-300" />
                    <div className="flex flex-col items-center mx-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E63946]" />
                      <span className="text-[10px] text-gray-500 mt-0.5 whitespace-nowrap">{stop}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex-1 border-t-2 border-dashed border-gray-300 min-w-[16px]" />
          </div>

          {/* Ending Destination Node */}
          <div className="flex-shrink-0 flex flex-col items-end pl-2">
            <div className="flex items-center gap-1 text-[#E63946] mb-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <rect x="3" y="15" width="2" height="7" fill="currentColor" />
              </svg>
              <span className="text-xs font-semibold">Ends</span>
            </div>
            <span className="text-xs text-gray-700 font-medium whitespace-nowrap">
              {data[data.length - 1]}, Nepal
            </span>
          </div>

        </div>
      </section>
    </>
  );
};

export default RouteMap;