import Image from "next/image"
import { Flag, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-100/60 rounded-xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Make a Difference?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of citizens who are helping protect Ghana's environment. Your action today can save our
                natural resources for tomorrow.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/report">
                  <Button className="bg-green-700/90 hover:bg-green-800/90">
                    <Flag className="mr-2 h-5 w-5" />
                    Report Illegal Mining
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 border-green-500 text-primary hover:bg-primary/5">
                  <Users className="mr-2 h-5 w-5" />
                  Join Our Network
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/people-ready.jpg"
                alt="Community Action"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-green-600">5000+</div>
                  <div className="text-sm text-gray-600">
                    Active community
                    <br />
                    volunteers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
