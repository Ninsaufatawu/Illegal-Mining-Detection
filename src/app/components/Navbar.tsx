"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="font-['Pacifico'] text-primary text-2xl">GeoGuard</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-primary font-medium">
              Features
            </Link>
            <Link href="#impact" className="text-gray-700 hover:text-primary font-medium">
              Impact
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-primary font-medium">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-primary font-medium">
              Testimonials
            </Link>
            <Link href="/report" className="text-gray-700 hover:text-primary font-medium">
              Report
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-primary font-medium">
              Contact
            </Link>
          </div>
          <div className="flex items-center">
            <Button className="bg-primary text-white hover:bg-primary/90">Sign In</Button>
            <div className="md:hidden ml-2">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-gray-700">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#impact"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impact
            </Link>
            <Link
              href="#how-it-works"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/report"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Report
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
