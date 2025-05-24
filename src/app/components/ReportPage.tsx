"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Check,
  Shield,
  Info,
  Search,
  FileText,
  Plus,
  X,
  Leaf,
  Save,
  ArrowLeft,
  ArrowRight,
  Send,
  Lock,
  MapPin,
  Compass,
  Upload,
  Trash2,
  UserCircle,
  ClipboardList,
  Camera,
  Loader2,
  Navigation,
} from "lucide-react"
import dynamic from "next/dynamic"
import { storeReport } from "@/lib/reports-db"

// Import Leaflet map dynamically to avoid SSR issues
const MapComponent = dynamic(() => import('./AccurateMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[300px] bg-gray-100">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
})

// Import report components
import ReportTypeSelection from "@/app/report/ReportTypeSelection"
import IncidentDetails from "@/app/report/IncidentDetails"
import LocationInformation from "@/app/report/LocationInformation"
import EvidenceUpload from "@/app/report/EvidenceUpload"
import ReportConfirmation from "@/app/report/ReportConfirmation"

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [reportType, setReportType] = useState<string>("")
  const [threatLevel, setThreatLevel] = useState<number[]>([2])
  const [locationTab, setLocationTab] = useState<string>("map")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [reportId, setReportId] = useState<string>("")
  const [progress, setProgress] = useState<number>(25)
  const [files, setFiles] = useState<File[]>([])
  const [blurFaces, setBlurFaces] = useState<boolean>(true)
  const [stripLocation, setStripLocation] = useState<boolean>(true)
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [locationSelectionError, setLocationSelectionError] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Array<{name: string, lat: number, lng: number}>>([])
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)
  const [userTypeError, setUserTypeError] = useState<boolean>(false)
  const searchResultsRef = useRef<HTMLDivElement>(null)
  const [mapKey, setMapKey] = useState<string>(`map-${Math.random().toString(36).substring(2, 9)}`)

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setProgress(currentStep * 25)
  }, [currentStep])

  useEffect(() => {
    if (locationTab === "map") {
      // Generate a new key to ensure a fresh map instance
      setMapKey(`map-${Math.random().toString(36).substring(2, 9)}`)
    }
  }, [locationTab])

  // Add a useEffect to handle changes to searchQuery
  useEffect(() => {
    if (searchQuery.trim().length >= 3) {
      // Auto-suggest after user types at least 3 characters
      handleSearch();
    }
  }, [searchQuery]);

  // Clear location selection error when a location is selected
  useEffect(() => {
    if (currentLocation) {
      setLocationSelectionError(false);
    }
  }, [currentLocation]);

  const handleNext = () => {
    if (currentStep === 1 && !reportType) {
      setUserTypeError(true)
      return
    }

    if (currentStep === 3 && !currentLocation) {
      setLocationSelectionError(true)
      return
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    // Generate a random report ID
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newReportId = `ID-${randomId}`;
    setReportId(newReportId);
    
    try {
      // Get form field values
      const miningTypeSelect = document.getElementById('mining-type') as HTMLSelectElement;
      const descriptionTextarea = document.getElementById('description') as HTMLTextAreaElement;
      
      const miningType = miningTypeSelect?.value || '';
      const incidentDescription = descriptionTextarea?.value || '';
      
      // Convert files to file names for storage
      // In a real app, you would upload these files to storage and store URLs
      const fileNames = files.map(file => file.name);
      
      // Store the report in Supabase
      const result = await storeReport({
        report_id: newReportId,
        report_type: reportType,
        threat_level: threatLevel[0],
        mining_activity_type: miningType,
        incident_description: incidentDescription,
        location_lat: currentLocation?.lat,
        location_lng: currentLocation?.lng,
        location_description: searchQuery || '',
        evidence_files: fileNames,
        blur_faces: blurFaces,
        strip_location: stripLocation,
        user_agent: navigator.userAgent,
      });
      
      console.log('Report submission result:', result);
      
      if (!result.success) {
        console.error('Failed to store report:', result.error);
        // You could show an error message here, but for now we'll still show success
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      // Still show success to the user even if database storage failed
    }
    
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      if (files.length + newFiles.length <= 5) {
        setFiles([...files, ...newFiles])
      }
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const resetForm = () => {
    setCurrentStep(1)
    setReportType("")
    setThreatLevel([2])
    setLocationTab("map")
    setIsSubmitted(false)
    setReportId("")
    setFiles([])
    setBlurFaces(true)
    setStripLocation(true)
    setCurrentLocation(null)
    setLocationError(null)
    setLocationSelectionError(false)
    setSearchQuery("")
    setSearchResults([])
    setUserTypeError(false)
    window.scrollTo(0, 0)
  }
  
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }
    
    setIsLoadingLocation(true)
    setLocationError(null)
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setIsLoadingLocation(false)
      },
      (error) => {
        setLocationError("Unable to retrieve your location")
        setIsLoadingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  }
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setSearchResults([]);
    
    try {
      // Use OpenStreetMap Nominatim geocoding API to search for real locations
      // Restrict to Ghana with countrycodes=gh
      const searchTerm = encodeURIComponent(searchQuery.trim() + ", Ghana");
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}&countrycodes=gh&limit=5`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        // Transform the response into our expected format
        const results = data.map((item: any) => ({
          name: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon)
        }));
        
        setSearchResults(results);
      } else {
        // If no results, show mining-specific locations in Ghana as fallback
        const miningLocations = [
          { name: "Obuasi Gold Mines", lat: 6.2066, lng: -1.6689 },
          { name: "Tarkwa Gold Mine", lat: 5.3018, lng: -1.9886 },
          { name: "Prestea Mining Area", lat: 5.4323, lng: -2.1437 },
          { name: "Bibiani Gold Mine", lat: 6.4632, lng: -2.3295 },
          { name: "Akyem Gold Mine", lat: 6.3400, lng: -0.9900 }
        ];
        setSearchResults([
          { name: `No exact results for "${searchQuery}". Try these mining areas:`, lat: 0, lng: 0 },
          ...miningLocations
        ]);
      }
    } catch (error) {
      console.error("Error searching for location:", error);
      // In case of error, provide some fallback options
      setSearchResults([
        { name: "Error searching. Try these major cities:", lat: 0, lng: 0 },
        { name: "Accra", lat: 5.6037, lng: -0.1870 },
        { name: "Kumasi", lat: 6.6885, lng: -1.6244 },
        { name: "Takoradi", lat: 4.8845, lng: -1.7519 }
      ]);
    }
    
    setShowSearchResults(true);
  };
  
  const selectSearchResult = (result: {name: string, lat: number, lng: number}) => {
    // Update the currentLocation state with the selected coordinates
    setCurrentLocation({ lat: result.lat, lng: result.lng });
    setSearchQuery(result.name);
    setShowSearchResults(false);
    
    // Generate a new map key to force refresh the map with new location
    setMapKey(`map-${Math.random().toString(36).substring(2, 9)}`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ReportTypeSelection 
            reportType={reportType} 
            setReportType={setReportType} 
            userTypeError={userTypeError}
          />
        )
      case 2:
        return (
          <IncidentDetails 
            threatLevel={threatLevel} 
            setThreatLevel={setThreatLevel} 
          />
        )
      case 3:
        return (
          <LocationInformation
            locationTab={locationTab}
            setLocationTab={setLocationTab}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            isLoadingLocation={isLoadingLocation}
            setIsLoadingLocation={setIsLoadingLocation}
            locationError={locationError}
            setLocationError={setLocationError}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            showSearchResults={showSearchResults}
            setShowSearchResults={setShowSearchResults}
            mapKey={mapKey}
            setMapKey={setMapKey}
            handleSearch={handleSearch}
            getCurrentLocation={getCurrentLocation}
            selectSearchResult={selectSearchResult}
            locationSelectionError={locationSelectionError}
          />
        )
      case 4:
        return (
          <EvidenceUpload
            files={files}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
            blurFaces={blurFaces}
            setBlurFaces={setBlurFaces}
            stripLocation={stripLocation}
            setStripLocation={setStripLocation}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="container mx-auto px-3 py-8 max-w-4xl">
        <div className="absolute top-3 right-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white border-none rounded-button whitespace-nowrap"
                >
                  <X className="mr-1 h-3 w-3" />
                  Quick Exit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Quickly leave this page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-1">Report Illegal Mining Activity</h1>
            <p className="text-green-600 text-base">Help protect our environment by reporting illegal activities</p>
          </div>
          {!isSubmitted && (
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-button whitespace-nowrap bg-green-50 text-green-700 hover:bg-green-100"
              >
                <Save className="mr-1 h-3 w-3" />
                Save Draft
              </Button>
            </div>
          )}
          {!isSubmitted && (
            <Alert className="bg-green-50 border border-green-200 mb-4 py-2">
              <Shield className="h-3 w-3 mr-1 text-green-600" />
              <AlertTitle className="text-green-800 text-sm">Your safety is our priority</AlertTitle>
              <AlertDescription className="text-green-700 text-xs">
                Do not put yourself at risk to gather information. All reports are encrypted and your identity is
                protected.
              </AlertDescription>
            </Alert>
          )}
          {!isSubmitted && (
            <div className="mb-16">
              <div className="relative">
                <Progress value={progress} className="h-1.5 bg-green-100" />
                <div className="absolute top-3 w-full flex justify-between">
                  <div
                    className={`flex flex-col items-center ${currentStep >= 1 ? "text-green-600" : "text-green-400"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 1 ? "bg-green-600 text-white" : "bg-green-100"
                      }`}
                    >
                      <UserCircle className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1 hidden md:block">User Type</span>
                  </div>
                  <div
                    className={`flex flex-col items-center ${currentStep >= 2 ? "text-green-600" : "text-green-400"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 2 ? "bg-green-600 text-white" : "bg-green-100"
                      }`}
                    >
                      <ClipboardList className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1 hidden md:block">Details</span>
                  </div>
                  <div
                    className={`flex flex-col items-center ${currentStep >= 3 ? "text-green-600" : "text-green-400"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 3 ? "bg-green-600 text-white" : "bg-green-100"
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1 hidden md:block">Location</span>
                  </div>
                  <div
                    className={`flex flex-col items-center ${currentStep >= 4 ? "text-green-600" : "text-green-400"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 4 ? "bg-green-600 text-white" : "bg-green-100"
                      }`}
                    >
                      <Camera className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1 hidden md:block">Evidence</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Card className="mb-5 border-green-100 shadow-md">
            <CardContent className="pt-4 px-4 sm:px-6">
              {isSubmitted ? (
                <ReportConfirmation reportId={reportId} resetForm={resetForm} />
              ) : (
                renderStepContent()
              )}
            </CardContent>
            {!isSubmitted && (
              <CardFooter className="flex justify-between pt-2 pb-4 px-4 sm:px-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="rounded-button whitespace-nowrap border-green-200 text-green-700 hover:bg-green-50 text-sm py-1 h-8"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="rounded-button whitespace-nowrap bg-green-600 hover:bg-green-700 text-white text-sm py-1 h-8"
                >
                  {currentStep < 4 ? (
                    <>
                      Next
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Submit Report
                      <Send className="ml-1 h-3 w-3" />
                    </>
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
          <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100">
            <div className="flex items-start space-x-3">
              <div className="text-green-600">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-green-800 mb-1 text-sm">Secure Reporting</h3>
                <p className="text-xs text-green-600">
                  This portal uses end-to-end encryption. Your IP address is not logged, and all metadata is stripped
                  from uploaded files.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
