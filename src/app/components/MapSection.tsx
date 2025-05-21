"use client"
import { Plus, Minus, Focus, RefreshCw, CheckCheck, UserIcon as UserVoice } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useRef } from "react";
// Don't import Leaflet directly at the top level - causes SSR errors
// import L from 'leaflet';
import { fixLeafletMarkerIcons } from "../utils/leaflet-config";
import Link from "next/link";
const EChartsReact = dynamic(() => import("echarts-for-react"), { ssr: false });

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const ZoomControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);

// Types for our mining sites
interface MiningSite {
  id: string;
  position: [number, number];
  type: "legal" | "illegal";
  name: string;
  details: string;
  lastUpdated: string;
}

export default function MapSection() {
  // Ghana's approximate center coordinates
  const ghanaCenter: [number, number] = [7.9465, -1.0232];
  
  // State for mining sites with some initial data
  const [miningSites, setMiningSites] = useState<MiningSite[]>([
    {
      id: "site1",
      position: [7.9465, -1.0232],
      type: "legal",
      name: "Golden Resource Mine",
      details: "Active since 2018, properly licensed",
      lastUpdated: new Date().toLocaleString()
    },
    {
      id: "site2",
      position: [7.8465, -1.1232],
      type: "illegal",
      name: "Unknown Operation",
      details: "Detected on satellite imagery, no permits",
      lastUpdated: new Date().toLocaleString()
    },
    {
      id: "site3",
      position: [8.0465, -0.9232],
      type: "illegal",
      name: "River Mining Operation",
      details: "Water pollution detected, no authorization",
      lastUpdated: new Date().toLocaleString()
    },
    {
      id: "site4",
      position: [7.7065, -1.2532],
      type: "illegal",
      name: "Illegal Excavation Site",
      details: "Detected by drone surveillance",
      lastUpdated: new Date().toLocaleString()
    },
    {
      id: "site5",
      position: [8.1765, -0.8932],
      type: "legal",
      name: "Ashanti Gold Mine",
      details: "Operating with proper environmental permits",
      lastUpdated: new Date().toLocaleString()
    },
  ]);
  
  // Risk areas
  const [riskAreas, setRiskAreas] = useState<{center: [number, number], radius: number}[]>([
    { center: [7.9065, -1.0832], radius: 5000 },
    { center: [8.1465, -0.9032], radius: 3000 },
    { center: [7.7565, -1.2032], radius: 4000 }
  ]);
  
  // Last update timestamp
  const [lastUpdateTime, setLastUpdateTime] = useState<string>(new Date().toLocaleString());
  
  // Map ref for accessing map methods
  const mapRef = useRef(null);
  
  // Simulation of real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update the timestamp
      setLastUpdateTime(new Date().toLocaleString());
      
      // Simulate a new detection or update
      const randomSite = Math.floor(Math.random() * miningSites.length);
      
      setMiningSites(prevSites => {
        const newSites = [...prevSites];
        // Slightly move the position to simulate movement/updates
        const newLat = newSites[randomSite].position[0] + (Math.random() * 0.01 - 0.005);
        const newLng = newSites[randomSite].position[1] + (Math.random() * 0.01 - 0.005);
        
        newSites[randomSite] = {
          ...newSites[randomSite],
          position: [newLat, newLng],
          lastUpdated: new Date().toLocaleString()
        };
        
        return newSites;
      });
      
      // Occasionally add a new site (10% chance)
      if (Math.random() < 0.1) {
        const newLat = ghanaCenter[0] + (Math.random() * 0.4 - 0.2);
        const newLng = ghanaCenter[1] + (Math.random() * 0.4 - 0.2);
        const isIllegal = Math.random() > 0.3; // 70% chance of being illegal
        
        const newSite: MiningSite = {
          id: `site${Date.now()}`,
          position: [newLat, newLng],
          type: isIllegal ? "illegal" : "legal",
          name: isIllegal ? "Newly Detected Operation" : "New Licensed Mine",
          details: isIllegal ? "Under investigation" : "Recently approved license",
          lastUpdated: new Date().toLocaleString()
        };
        
        setMiningSites(prev => [...prev, newSite]);
      }
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Refresh map data manually
  const refreshData = useCallback(() => {
    // Simulate fetching new data
    const newSite: MiningSite = {
      id: `site${Date.now()}`,
      position: [
        ghanaCenter[0] + (Math.random() * 0.4 - 0.2),
        ghanaCenter[1] + (Math.random() * 0.4 - 0.2)
      ],
      type: Math.random() > 0.5 ? "illegal" : "legal",
      name: "New Detection",
      details: "Just detected via satellite",
      lastUpdated: new Date().toLocaleString()
    };
    
    setMiningSites(prev => [...prev, newSite]);
  }, []);
  
  // Fix Leaflet icon issues
  useEffect(() => {
    // Only run client-side
    if (typeof window !== 'undefined') {
      fixLeafletMarkerIcons();
    }
  }, []);

  // Create a custom icon for site markers - moved inside component and made client-safe
  const createSiteMarker = useCallback((type: 'legal' | 'illegal') => {
    // For SSR safety
    if (typeof window === 'undefined') {
      // Return undefined for type safety (Marker component accepts undefined for icon)
      return undefined;
    }
    
    // Import Leaflet dynamically only when on client
    const L = require('leaflet');
    
    return L.divIcon({
      className: `custom-marker ${type === 'legal' ? 'legal-marker' : 'illegal-marker'}`,
      html: `<div style="background-color: ${type === 'legal' ? '#10b981' : '#ef4444'}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [15, 15],
      iconAnchor: [7, 7]
    });
  }, []);

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Monitoring System</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our GIS-based platform provides real-time monitoring of mining activities across Ghana, helping authorities
            identify and address illegal operations.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-[500px] map-container relative">
              {typeof window !== 'undefined' && (
                <MapContainer 
                  center={ghanaCenter} 
                  zoom={7} 
                  style={{ height: "100%", width: "100%" }}
                  zoomControl={false}
                  ref={mapRef}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Display mining sites markers */}
                  {miningSites.map((site) => (
                    <Marker 
                      key={site.id} 
                      position={site.position}
                      icon={createSiteMarker(site.type)}
                    >
                      <Popup>
                        <div className="font-semibold">{site.name}</div>
                        <div className="text-sm text-gray-600">Status: {site.type === 'legal' ? 'Legal Operation' : 'Illegal Operation'}</div>
                        <div className="text-sm">{site.details}</div>
                        <div className="text-xs text-gray-500 mt-1">Last updated: {site.lastUpdated}</div>
                      </Popup>
                    </Marker>
                  ))}
                  
                  {/* Display risk areas */}
                  {riskAreas.map((area, index) => (
                    <CircleMarker 
                      key={`risk-${index}`}
                      center={area.center}
                      radius={20}
                      pathOptions={{
                        fillColor: "#f97316",
                        fillOpacity: 0.3,
                        color: "#f97316",
                        weight: 1
                      }}
                    >
                      <Popup>
                        <div>High-risk area</div>
                        <div className="text-sm">Monitoring closely for illegal activities</div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              )}
              
              <div className="absolute top-4 right-4 bg-white p-3 rounded shadow-md z-[1000]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Legal Mining</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Illegal Mining</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-300 to-red-500 rounded-full"></div>
                  <span className="text-sm">Risk Areas</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded shadow-md z-[1000]">
                <p className="text-sm text-gray-600">Zoom in to see affected areas</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => {
                      const map = mapRef.current;
                      if (map) {
                        // @ts-ignore - TS doesn't know about leaflet methods
                        map.setZoom(map.getZoom() + 1);
                      }
                    }}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => {
                      const map = mapRef.current;
                      if (map) {
                        // @ts-ignore - TS doesn't know about leaflet methods
                        map.setZoom(map.getZoom() - 1);
                      }
                    }}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => {
                      const map = mapRef.current;
                      if (map) {
                        // @ts-ignore - TS doesn't know about leaflet methods
                        map.setView(ghanaCenter, 7);
                      }
                    }}
                  >
                    <Focus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Last updated: {lastUpdateTime}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8 text-gray-500 hover:text-primary"
                    onClick={refreshData}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                    <CheckCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">Enforcement Actions</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sites shut down</span>
                    <span className="font-semibold">{Math.floor(miningSites.filter(s => s.type === "illegal").length * 0.4)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Equipment seized</span>
                    <span className="font-semibold">{Math.floor(miningSites.filter(s => s.type === "illegal").length * 1.7)} units</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Arrests made</span>
                    <span className="font-semibold">{Math.floor(miningSites.filter(s => s.type === "illegal").length * 0.9)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="bg-green-600/10 p-6 rounded-lg border border-green-700/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-green-400/20 bg-opacity-20 text-primary rounded-full">
                  <UserVoice className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-green-600">Make a Difference</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Your reports help us identify and stop illegal mining activities. Together, we can protect Ghana's
                natural resources.
              </p>
              <Link href="/report">
                <Button className="w-full bg-green-700 hover:bg-primary/90">Report Illegal Activity</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
