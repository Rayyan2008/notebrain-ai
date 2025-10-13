"use client"

import { useEffect, useRef } from "react"

export function AnimatedCat() {
  const catRef = useRef<HTMLDivElement>(null)
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!catRef.current || !leftEyeRef.current || !rightEyeRef.current) return

      const catRect = catRef.current.getBoundingClientRect()
      const catCenterX = catRect.left + catRect.width / 2
      const catCenterY = catRect.top + catRect.height / 2

      const angle = Math.atan2(e.clientY - catCenterY, e.clientX - catCenterX)
      const distance = Math.min(15, Math.sqrt((e.clientX - catCenterX) ** 2 + (e.clientY - catCenterY) ** 2) / 10)

      const eyeX = Math.cos(angle) * distance
      const eyeY = Math.sin(angle) * distance

      leftEyeRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`
      rightEyeRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={catRef}
      className="fixed bottom-6 right-6 z-50 animate-bounce"
      style={{ animation: "bounce 3s infinite" }}
    >
      <div className="relative w-24 h-24">
        {/* Cat body */}
        <div className="absolute inset-0 bg-gray-800 rounded-full shadow-lg">
          {/* Cat ears */}
          <div className="absolute -top-2 left-2 w-6 h-6 bg-gray-800 rounded-full transform rotate-45"></div>
          <div className="absolute -top-2 right-2 w-6 h-6 bg-gray-800 rounded-full transform rotate-45"></div>

          {/* Cat eyes */}
          <div className="absolute top-6 left-4 w-3 h-3 bg-white rounded-full overflow-hidden">
            <div
              ref={leftEyeRef}
              className="w-2 h-2 bg-black rounded-full transition-transform duration-100 ease-out"
            ></div>
          </div>
          <div className="absolute top-6 right-4 w-3 h-3 bg-white rounded-full overflow-hidden">
            <div
              ref={rightEyeRef}
              className="w-2 h-2 bg-black rounded-full transition-transform duration-100 ease-out"
            ></div>
          </div>

          {/* Cat nose */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"></div>

          {/* Cat mouth */}
          <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-2 h-1 border-b-2 border-gray-600 rounded-b-full"></div>

          {/* Cat whiskers */}
          <div className="absolute top-7 left-1 w-4 h-px bg-gray-600 transform -rotate-12"></div>
          <div className="absolute top-8 left-1 w-4 h-px bg-gray-600 transform rotate-12"></div>
          <div className="absolute top-7 right-1 w-4 h-px bg-gray-600 transform rotate-12"></div>
          <div className="absolute top-8 right-1 w-4 h-px bg-gray-600 transform -rotate-12"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-4 -left-4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}
