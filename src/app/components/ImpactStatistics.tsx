"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Import ECharts dynamically on client side
import dynamic from "next/dynamic"
const EChartsReact = dynamic(() => import("echarts-for-react"), { ssr: false })

export default function ImpactStatistics() {
  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Impact of Illegal Mining</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Illegal mining, known locally as "galamsey," has devastating effects on Ghana's environment, economy, and
            communities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="grid grid-cols-2  gap-6 mb-8">
              <Card className="border border-gray-100 h-36">
                <CardContent className="p-4">
                  <h3 className="text-4xl font-bold text-green-500 mb-2">60%</h3>
                  <p className="text-gray-600">of Ghana's water bodies are polluted by galamsey operations</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-100 h-36">
                <CardContent className="p-4">
                  <h3 className="text-4xl font-bold text-green-500 mb-2">15%</h3>
                  <p className="text-gray-600">of Atewa Forest lost in 2023 due to illegal mining</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-100 h-36">
                <CardContent className="p-4">
                  <h3 className="text-4xl font-bold text-green-500 mb-2">2.7M</h3>
                  <p className="text-gray-600">people affected by contaminated water sources</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-100 h-36">
                <CardContent className="p-4">
                  <h3 className="text-4xl font-bold text-green-500 mb-2">$250M</h3>
                  <p className="text-gray-600">annual economic loss due to environmental damage</p>
                </CardContent>
              </Card>
            </div>
            <Card className="border border-gray-100">
              <CardContent className="p-4">
                <div className="h-64">
                  <ImpactChart />
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="border border-gray-100">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Before & After: The Effects of Illegal Mining</h3>
              <BeforeAfterSlider />
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-yellow-600 mt-0.5">
                    <span className="ri-information-line"></span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    This comparison shows the Pra River Basin in the Western Region, one of the most affected areas.
                    Satellite imagery reveals significant water pollution and deforestation within just one year.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ImpactChart() {
  const option = {
    animation: false,
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderColor: "#ddd",
      borderWidth: 1,
      textStyle: {
        color: "#1f2937",
      },
    },
    legend: {
      data: ["Water Pollution", "Deforestation"],
      bottom: 0,
      textStyle: {
        color: "#1f2937",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["2019", "2020", "2021", "2022", "2023", "2024"],
      axisLine: {
        lineStyle: {
          color: "#ddd",
        },
      },
      axisLabel: {
        color: "#1f2937",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#ddd",
        },
      },
      axisLabel: {
        color: "#1f2937",
        formatter: "{value}%",
      },
      splitLine: {
        lineStyle: {
          color: "#f0f0f0",
        },
      },
    },
    series: [
      {
        name: "Water Pollution",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          color: "rgba(87, 181, 231, 1)",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(87, 181, 231, 0.2)",
              },
              {
                offset: 1,
                color: "rgba(87, 181, 231, 0.05)",
              },
            ],
          },
        },
        symbol: "none",
        data: [30, 38, 45, 52, 60, 63],
      },
      {
        name: "Deforestation",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          color: "rgba(252, 141, 98, 1)",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(252, 141, 98, 0.2)",
              },
              {
                offset: 1,
                color: "rgba(252, 141, 98, 0.05)",
              },
            ],
          },
        },
        symbol: "none",
        data: [5, 7, 9, 12, 15, 18],
      },
    ],
  }

  return <EChartsReact option={option} style={{ height: "100%", width: "100%" }} />
}

function BeforeAfterSlider() {
  const sliderRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const sliderLineRef = useRef<HTMLDivElement>(null)
  const sliderHandleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateSlider = () => {
      if (!sliderRef.current || !overlayRef.current || !sliderLineRef.current || !sliderHandleRef.current) return

      const value = sliderRef.current.value
      overlayRef.current.style.width = `${value}%`
      sliderLineRef.current.style.left = `${value}%`
      sliderHandleRef.current.style.left = `${value}%`
    }

    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener("input", updateSlider)
      // Initialize slider
      updateSlider()
    }

    return () => {
      if (slider) {
        slider.removeEventListener("input", updateSlider)
      }
    }
  }, [])

  return (
    <div>
      <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Before: Pristine River"
          className="absolute top-0 left-0 w-full h-full object-cover z-10 object-top"
        />
        <img
          src="/images/river pra.jpg"
          alt="After: Polluted River"
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
        />
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
          <div ref={overlayRef} className="absolute top-0 left-0 h-full bg-white" style={{ width: "50%" }}></div>
          <div
            ref={sliderLineRef}
            className="absolute top-0 left-0 h-full w-0.5 bg-white z-30"
            style={{ left: "50%" }}
          ></div>
          <div
            ref={sliderHandleRef}
            className="absolute top-1/2 left-0 w-8 h-8 -mt-4 -ml-4 bg-white rounded-full shadow-md z-40 flex items-center justify-center cursor-pointer"
            style={{ left: "50%" }}
          >
            <div className="w-6 h-6 flex items-center justify-center text-primary">
              <span className="ri-arrow-left-right-line"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <input ref={sliderRef} type="range" min="0" max="100" defaultValue="50" className="slider w-full" />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>2022: Pristine Forest & River</span>
        <span>2023: After Illegal Mining</span>
      </div>
    </div>
  )
}
