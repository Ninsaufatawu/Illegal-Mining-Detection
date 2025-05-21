import { Card, CardContent } from "@/components/ui/card"

export default function FaqSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our platform and illegal mining reporting
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">How do I report illegal mining?</h3>
              <p className="text-gray-600">
                Use our secure online form or mobile app to submit reports anonymously. Include location details and
                photos if possible.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Is my identity protected?</h3>
              <p className="text-gray-600">
                Yes, all reports are completely anonymous. We use end-to-end encryption to protect your identity.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">What happens after I report?</h3>
              <p className="text-gray-600">
                Reports are verified using satellite data and field agents. Confirmed cases are forwarded to authorities
                for immediate action.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">How can I get involved?</h3>
              <p className="text-gray-600">
                Join our community volunteer program, attend training sessions, or partner with us for enhanced
                monitoring.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
