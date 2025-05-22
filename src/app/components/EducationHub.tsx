import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EducationHub() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Environmental Education Hub</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about environmental protection and join our community training programs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="overflow-hidden flex flex-col h-full">
            <div className="w-full h-56 relative overflow-hidden">
            <Image
              src="/images/training-1.jpg"
              alt="Training Programs"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
                style={{ width: '100%', height: '100%' }}
                priority
              />
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-4">Training Programs</h3>
              <ul className="space-y-3 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Environmental Monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Water Quality Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Reforestation Techniques</span>
                </li>
              </ul>
              <Button className="mt-6 w-full bg-green-700 hover:bg-green-600/90">Join Program</Button>
            </CardContent>
          </Card>
          <Card className="overflow-hidden flex flex-col h-full">
            <div className="w-full h-56 relative overflow-hidden">
            <Image
              src="/images/digital resources.jpg"
              alt="Digital Resources"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
                style={{ width: '100%', height: '100%' }}
                priority
              />
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-4">Digital Resources</h3>
              <ul className="space-y-3 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Online Courses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Educational Videos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Interactive Guides</span>
                </li>
              </ul>
              <Button className="mt-6 w-full bg-green-700 hover:bg-green-600/90">Access Resources</Button>
            </CardContent>
          </Card>
          <Card className="overflow-hidden flex flex-col h-full">
            <div className="w-full h-56 relative overflow-hidden">
            <Image
              src="/images/training-2.jpg"
              alt="Community Outreach"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
                style={{ width: '100%', height: '100%' }}
                priority
              />
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-4">Community Outreach</h3>
              <ul className="space-y-3 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>School Programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Community Workshops</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Awareness Campaigns</span>
                </li>
              </ul>
              <Button className="mt-6 w-full bg-green-700 hover:bg-green-600/90">Get Involved</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
