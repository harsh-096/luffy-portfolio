import React, { useState, useEffect } from 'react'
import { CornerTicks } from './CornerTicks'
import { portfolioData } from '../data/portfolioData'

export const AvatarBanner: React.FC = () => {
  const { profile } = portfolioData
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  // Rotating taglines animation (changing time by time)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % profile.taglines.length)
        setIsFlipping(false)
      }, 250)
    }, 3200)

    return () => clearInterval(interval)
  }, [profile.taglines.length])

  return (
    <div>
      {/* Top Engineering Dot Matrix Banner (Compact Sleek Strip) */}
      <div className="border-x border-edge select-none screen-line-before screen-line-after relative">
        <CornerTicks top={false} bottom={true} />
        <div className="overflow-hidden px-4 py-2 sm:px-5 sm:py-2.5">
          <div className="h-full min-h-[28px] w-full dot-grid sm:min-h-[38px] rounded-xs border border-edge/30"></div>
        </div>
      </div>

      {/* Profile Header Grid Block */}
      <div className="screen-line-after flex items-center justify-between border-x border-edge relative py-3 sm:py-5">
        <CornerTicks top={true} bottom={false} />

        {/* Profile Info Details (Left side - Fully and permanently displayed) */}
        <div className="flex flex-1 flex-col justify-center gap-2 pl-4 sm:pl-7 md:pl-8 pr-2 sm:pr-4">
          {/* Name & Blue Verified Badge */}
          <div className="flex items-center gap-2.5 pt-0.5 pb-0.5">
            <h1 className="font-pixel text-xl sm:text-3xl md:text-4xl leading-none font-bold text-foreground tracking-tight">
              {profile.name}
            </h1>

            {/* Authentic SVG Verified Badge */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="size-4.5 sm:size-5 text-info select-none shrink-0"
              aria-label="Verified Engineer"
            >
              <path
                fill="currentColor"
                d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
              />
            </svg>
          </div>

          {/* Animated Dynamic Subline (Cycling time by time) */}
          <div className="font-mono text-sm sm:text-base font-semibold text-foreground/90 leading-tight min-h-[26px] sm:min-h-[28px] flex items-center overflow-hidden">
            <span
              className={`transition-all duration-250 ease-out transform ${
                isFlipping
                  ? 'opacity-0 -translate-y-2 blur-[0.5px]'
                  : 'opacity-100 translate-y-0 blur-0'
              }`}
            >
              {profile.taglines[taglineIndex]}
            </span>
          </div>

          {/* Activity / Availability Status */}
          <div className="flex items-center gap-2 pt-0.5 font-mono text-xs sm:text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              {profile.status}
            </span>
          </div>
        </div>

        {/* Clean, High-Fidelity Avatar Container (Right side) */}
        <div className="shrink-0 p-2 sm:p-4 md:p-6 flex justify-end">
          <div className="size-28 sm:size-38 md:size-44 rounded-2xl border border-border/80 p-1.5 transition-all duration-300 hover:shadow-lg dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)] bg-card shadow-xs group">
            <div className="avatar-glitch relative size-full overflow-hidden rounded-[10px]">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                loading="eager"
                decoding="async"
                className="select-none rounded-[10px] object-cover size-full transition-transform duration-300 group-hover:scale-105"
              />
              {/* Scanlines overlay on hover */}
              <span
                aria-hidden="true"
                className="avatar-glitch__scanlines pointer-events-none absolute inset-0 rounded-[10px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              ></span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-inset ring-black/10 dark:ring-white/10"
              ></span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Hatch Strip Divider */}
      <div className="hatch-strip"></div>
    </div>
  )
}
