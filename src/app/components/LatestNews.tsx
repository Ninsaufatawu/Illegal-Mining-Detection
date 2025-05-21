import { ArrowRight, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function LatestNews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Updates</h2>
            <p className="text-lg text-gray-600">Stay informed about our latest achievements and initiatives</p>
          </div>
          <a href="#" className="text-green-600 font-medium hover:underline flex items-center gap-2">
            View All News
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4" />
                <span>May 12, 2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">New Satellite Monitoring System Launched</h3>
              <p className="text-gray-600 mb-4">
                Enhanced monitoring capabilities now cover 95% of Ghana's mining regions with real-time alerts.
              </p>
                <div className="flex items-center gap-2 text-green-600">
                <ArrowRight className="h-4 w-4" />
                <a href="#" className="font-medium hover:underline">
                  Read More
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4" />
                <span>May 8, 2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Training Program Expands</h3>
              <p className="text-gray-600 mb-4">
                500 local volunteers trained in environmental monitoring and reporting procedures.
              </p>
              <div className="flex items-center gap-2 text-green-600">
                <ArrowRight className="h-4 w-4" />
                <a href="#" className="font-medium hover:underline">
                  Read More
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4" />
                <span>May 3, 2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">International Recognition</h3>
              <p className="text-gray-600 mb-4">
                GeoGuard wins UN Environmental Protection Award for innovative approach to combat illegal mining.
              </p>
              <div className="flex items-center gap-2 top-7 relative text-green-600">
                <ArrowRight className="h-4 w-4" />
                <a href="#" className="font-medium hover:underline">
                  Read More
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
