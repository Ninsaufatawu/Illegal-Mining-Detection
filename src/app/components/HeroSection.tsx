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
import Link from "next/link"

export default function HeroSection() {
  const [reportModalOpen, setReportModalOpen] = useState(false)

  return (
    <section className="hero-section min-h-[90vh] sm:min-h-screen flex items-center pt-5 sm:pt-7">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white mb-10 md:mb-0">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs sm:text-sm font-medium">Live Monitoring Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">Protecting Ghana's Natural Heritage</h1>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 opacity-90">
              Advanced technology meets community action. Join thousands of citizens in our mission to preserve Ghana's
              environment for future generations.
            </p>
            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-white/10 rounded-full">
                  <Shield className="w-3 sm:w-4 h-3 sm:h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">Real-time Protection</h3>
                  <p className="text-xs sm:text-sm opacity-90">24/7 satellite monitoring & AI analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-white/10 rounded-full">
                  <Users className="w-3 sm:w-4 h-3 sm:h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">Community-Driven</h3>
                  <p className="text-xs sm:text-sm opacity-90">5,000+ active volunteers nationwide</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-white/10 rounded-full">
                  <Award className="w-3 sm:w-4 h-3 sm:h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">Award-Winning</h3>
                  <p className="text-xs sm:text-sm opacity-90">UN Environmental Protection Award 2025</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3">
              <Link href="/report">
                <Button
                  className="bg-emerald-600 text-white hover:bg-emerald-600/80 px-4 sm:px-5 py-2 sm:py-6 h-12 sm:h-14 text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
                >
                  <Flag className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                  Report Illegal Mining
                </Button>
              </Link>
              <Link href="/license">
                <Button
                  className="bg-white text-gray-800 hover:bg-white/90 px-4 sm:px-5 py-2 sm:py-6 h-12 sm:h-14 text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
                >
                  <Flag className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                  Apply for License
                </Button>
              </Link>
              
            </div>
          </div>
          <div className="w-full md:w-1/2 relative flex justify-center">
            <div className="absolute -top-10 sm:-top-16 -right-10 sm:-right-16 w-40 sm:w-60 h-40 sm:h-60 bg-primary opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 sm:-bottom-16 -left-10 sm:-left-16 w-40 sm:w-60 h-40 sm:h-60 bg-green-500 opacity-20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="absolute -top-3 sm:-top-5 -left-3 sm:-left-5 bg-white rounded-lg shadow-lg p-2 sm:p-3 z-10">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                    <Shield className="w-3 sm:w-4 h-3 sm:h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">Protected Area</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">+2,500 hectares this month</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 sm:-bottom-5 -right-3 sm:-right-5 bg-white rounded-lg shadow-lg p-2 sm:p-3 z-10">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                    <Users className="w-3 sm:w-4 h-3 sm:h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">Active Reports</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">150+ this week</div>
                  </div>
                </div>
              </div>
              <div className="relative w-[280px] sm:w-[500px] h-[200px] sm:h-[350px] overflow-visible">
                <Image
                  src="/images/bg-forest.jpg"
                  alt="Protected Forest"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      </section>
  )
}
