import React, { useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, Search, Navigation, Loader2, Info, Shield, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";

// Import Leaflet map dynamically to avoid SSR issues
const MapComponent = dynamic(() => import('../components/AccurateMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[300px] bg-gray-100">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
})

interface LocationInformationProps {
  locationTab: string;
  setLocationTab: (tab: string) => void;
  currentLocation: { lat: number, lng: number } | null;
  setCurrentLocation: (location: { lat: number, lng: number } | null) => void;
  isLoadingLocation: boolean;
  setIsLoadingLocation: (loading: boolean) => void;
  locationError: string | null;
  setLocationError: (error: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Array<{name: string, lat: number, lng: number}>;
  setSearchResults: (results: Array<{name: string, lat: number, lng: number}>) => void;
  showSearchResults: boolean;
  setShowSearchResults: (show: boolean) => void;
  mapKey: string;
  setMapKey: (key: string) => void;
  handleSearch: () => void;
  getCurrentLocation: () => void;
  selectSearchResult: (result: {name: string, lat: number, lng: number}) => void;
  locationSelectionError?: boolean;
}

export default function LocationInformation({
  locationTab, setLocationTab, currentLocation, setCurrentLocation,
  isLoadingLocation, setIsLoadingLocation, locationError, setLocationError,
  searchQuery, setSearchQuery, searchResults, setSearchResults,
  showSearchResults, setShowSearchResults, mapKey, setMapKey,
  handleSearch, getCurrentLocation, selectSearchResult, locationSelectionError
}: LocationInformationProps) {
  const searchResultsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Location Information</h2>
      {locationSelectionError && (
        <Alert variant="destructive" className="bg-red-50 text-red-800 border border-red-200 py-2 mb-2">
          <AlertCircle className="h-4 w-4 mr-1 text-red-600" />
          <AlertTitle className="text-xs font-medium">Location is required</AlertTitle>
          <AlertDescription className="text-xs">
            Please select a location on the map, search for a location, or enter coordinates manually before proceeding.
          </AlertDescription>
        </Alert>
      )}
      <Tabs defaultValue="map" value={locationTab} onValueChange={setLocationTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map" className="text-xs py-1.5">
            <MapPin className="mr-1.5 h-3 w-3" />
            Use Map
          </TabsTrigger>
          <TabsTrigger value="coordinates" className="text-xs py-1.5">
            <Compass className="mr-1.5 h-3 w-3" />
            Enter Coordinates
          </TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="space-y-3 pt-2">
          <div className={`relative w-full h-[300px] overflow-hidden rounded-md border ${locationSelectionError ? 'border-red-300 ring-1 ring-red-500' : ''}`}>
            {locationTab === "map" && typeof window !== 'undefined' && (
              <MapComponent 
                key={mapKey} 
                center={currentLocation || { lat: 5.6037, lng: -0.1870 }}
                zoom={10}
                currentLocation={currentLocation}
                onLocationSelected={(location: { lat: number; lng: number }) => setCurrentLocation(location)}
              />
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search for a location (e.g. Accra, Kumasi, Tarkwa)..."
                    className={`flex-1 h-8 text-sm pl-7 ${locationSelectionError ? 'border-red-300' : ''}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.trim().length >= 3 && setShowSearchResults(true)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm" className="h-8" onClick={handleSearch}>
                  <span className="text-xs">Search</span>
                </Button>
              </div>
              
              {showSearchResults && searchResults.length > 0 && (
                <div 
                  ref={searchResultsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-md z-10 max-h-[150px] overflow-auto"
                >
                  <ul className="py-1">
                    {searchResults.map((result, index) => (
                      <li 
                        key={index} 
                        className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs border-b last:border-b-0"
                        onClick={() => selectSearchResult(result)}
                      >
                        <div className="font-medium">{result.name}</div>
                        <div className="text-[10px] text-gray-500 flex items-center">
                          <MapPin className="h-2 w-2 mr-1" />
                          {result.lat.toFixed(4)}, {result.lng.toFixed(4)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant="outline"
                size="sm" 
                className="text-xs h-7 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Navigation className="h-3 w-3 mr-1" />
                )}
                {isLoadingLocation ? "Getting location..." : "Use my current location"}
              </Button>
            </div>
            
            {locationError && (
              <div className="bg-red-50 border border-red-200 rounded p-2 text-xs text-red-700">
                {locationError}
              </div>
            )}

            {currentLocation && (
              <div className="bg-green-50 border border-green-200 rounded p-2 text-xs">
                <div className="font-medium text-green-800">Location detected</div>
                <div className="text-green-700">
                  Latitude: {currentLocation.lat.toFixed(6)}, Longitude: {currentLocation.lng.toFixed(6)}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="coordinates" className="space-y-3 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="latitude" className="text-sm font-medium">
                Latitude
              </Label>
              <Input 
                id="latitude" 
                type="text" 
                placeholder="e.g., 5.6037" 
                className={`mt-1 h-8 text-sm ${locationSelectionError ? 'border-red-300' : ''}`}
                value={currentLocation?.lat.toFixed(6) || ""} 
                onChange={(e) => setCurrentLocation(prev => ({
                  lat: parseFloat(e.target.value) || 0,
                  lng: prev?.lng || 0
                }))}
              />
            </div>
            <div>
              <Label htmlFor="longitude" className="text-sm font-medium">
                Longitude
              </Label>
              <Input 
                id="longitude" 
                type="text" 
                placeholder="e.g., -0.1870" 
                className={`mt-1 h-8 text-sm ${locationSelectionError ? 'border-red-300' : ''}`}
                value={currentLocation?.lng.toFixed(6) || ""} 
                onChange={(e) => setCurrentLocation(prev => ({
                  lat: prev?.lat || 0,
                  lng: parseFloat(e.target.value) || 0
                }))}
              />
            </div>
          </div>
          <Button 
            variant="outline"
            size="sm" 
            className="text-xs h-7 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 w-full"
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <Navigation className="h-3 w-3 mr-1" />
            )}
            {isLoadingLocation ? "Getting location..." : "Use my current location"}
          </Button>
          <div className="bg-muted p-3 rounded-md">
            <p className="text-xs flex items-start">
              <Info className="h-3 w-3 mr-1 text-blue-500 mt-0.5" />
              <span>
                You can find coordinates using Google Maps by right-clicking on a location and selecting "What's
                here?"
              </span>
            </p>
          </div>
        </TabsContent>
      </Tabs>
      <Alert className="py-2">
        <Shield className="h-3 w-3 mr-1 text-amber-500" />
        <AlertTitle className="text-xs font-medium">Privacy Protection</AlertTitle>
        <AlertDescription className="text-[10px]">
          Your location data is encrypted and only accessible to authorized personnel. We recommend using
          approximate coordinates for your safety.
        </AlertDescription>
      </Alert>
    </div>
  );
} 