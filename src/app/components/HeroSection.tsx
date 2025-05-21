"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Flag, Shield, Users, Award, Upload, FileSignature } from "lucide-react"

export default function HeroSection() {
  const [reportModalOpen, setReportModalOpen] = useState(false)

  return (
    <section className="hero-section min-h-screen flex items-center pt-7">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white mb-12 md:mb-0">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium">Live Monitoring Active</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Protecting Ghana's Natural Heritage</h1>
            <p className="text-base md:text-lg mb-6 opacity-90">
              Advanced technology meets community action. Join thousands of citizens in our mission to preserve Ghana's
              environment for future generations.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">Real-time Protection</h3>
                  <p className="text-sm opacity-90">24/7 satellite monitoring & AI analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">Community-Driven</h3>
                  <p className="text-sm opacity-90">5,000+ active volunteers nationwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">Award-Winning</h3>
                  <p className="text-sm opacity-90">UN Environmental Protection Award 2025</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 top-10">
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-600/80 px-5 py-6 h-14 text-sm cursor-pointer"
                onClick={() => setReportModalOpen(true)}
              >
                <Flag className="mr-2 h-4 w-4" />
                Report Illegal Mining
              </Button>
              <Button variant="secondary" className="bg-white text-gray-800 hover:bg-white/90 px-5 py-2 h-auto text-sm cursor-pointer">
                <FileSignature className="mr-2 h-4 w-4" />
                Apply for License
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative flex justify-center">
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-primary opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-green-500 opacity-20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="absolute -top-5 -left-5 bg-white rounded-lg shadow-lg p-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Protected Area</div>
                    <div className="text-xs text-gray-500">+2,500 hectares this month</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-lg p-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Active Reports</div>
                    <div className="text-xs text-gray-500">150+ this week</div>
                  </div>
                </div>
              </div>
              <div className="relative w-[500px] h-[350px] overflow-visible">
                <Image
                  src="/images/bg-forest.jpg"
                  alt="Protected Forest"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl shadow-2xl "
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">Report Illegal Mining Activity</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              setReportModalOpen(false)
              // Show success message
              alert("Report submitted successfully!")
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Details</label>
              <Input type="text" name="location" placeholder="Enter location or coordinates" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Activity</label>
              <Select name="activityType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surface_mining">Surface Mining</SelectItem>
                  <SelectItem value="river_mining">River Mining</SelectItem>
                  <SelectItem value="forest_clearing">Forest Clearing</SelectItem>
                  <SelectItem value="equipment_sighting">Heavy Equipment Sighting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea name="description" rows={3} placeholder="Describe what you observed..." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos (Optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center">
                <input type="file" name="photos" multiple accept="image/*" className="hidden" id="photoInput" />
                <label htmlFor="photoInput" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-400">Maximum 5 photos</span>
                </label>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="anonymous" name="anonymous" />
              <label htmlFor="anonymous" className="text-sm text-gray-600">
                Submit report anonymously
              </label>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setReportModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Submit Report
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
