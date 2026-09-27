import React, { useState, useRef, useEffect } from 'react'

type LuffyState = 'idle' | 'hovered' | 'stretching' | 'eating' | 'happy'

export const LuffyEasterEgg: React.FC = () => {
  const [state, setState] = useState<LuffyState>('idle')
  const [meatPosition, setMeatPosition] = useState<{ x: number; y: number } | null>(null)
  const [targetMeat, setTargetMeat] = useState<{ x: number; y: number }>({ x: 60, y: 40 })
  const [stretchProgress, setStretchProgress] = useState<number>(0) // 0 to 1
  const [isRetracting, setIsRetracting] = useState<boolean>(false)
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 360, height: 100 })

  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state === 'stretching' || state === 'eating' || state === 'happy') return
    setState('hovered')
    updateMeatPosition(e)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state === 'stretching' || state === 'eating' || state === 'happy') return
    updateMeatPosition(e)
  }

  const handleMouseLeave = () => {
    if (state === 'stretching' || state === 'eating' || state === 'happy') return
    setState('idle')
    setMeatPosition(null)
  }

  const updateMeatPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Position meat relative to the container, with wide room to the left
    const newPos = {
      x: Math.max(16, Math.min(rect.width - 86, e.clientX - rect.left)),
      y: Math.max(8, Math.min(rect.height - 20, e.clientY - rect.top)),
    }
    setMeatPosition(newPos)
  }

  // Realistic Gomu Gomu no Pistol Animation
  const feedLuffy = () => {
    if (state === 'stretching' || state === 'eating' || state === 'happy') return

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (animRef.current) cancelAnimationFrame(animRef.current)

    const targetX = meatPosition?.x ?? 50
    const targetY = meatPosition?.y ?? 35
    setTargetMeat({ x: targetX, y: targetY })
    setState('stretching')

    const startTime = performance.now()
    const stretchDuration = 320 // ms to reach out
    const retractDuration = 220 // ms to snap back

    const animateStretch = (time: number) => {
      const elapsed = time - startTime
      if (elapsed < stretchDuration) {
        // Phase 1: Stretching arm forward (easeOutCubic)
        const p = elapsed / stretchDuration
        const ease = 1 - Math.pow(1 - p, 3)
        setStretchProgress(ease)
        setIsRetracting(false)
        animRef.current = requestAnimationFrame(animateStretch)
      } else if (elapsed < stretchDuration + retractDuration) {
        // Phase 2: Snapping arm & meat back to mouth (easeInQuad)
        const p = (elapsed - stretchDuration) / retractDuration
        const ease = 1 - p * p
        setStretchProgress(ease)
        setIsRetracting(true)
        animRef.current = requestAnimationFrame(animateStretch)
      } else {
        // Phase 3: Meat reached Luffy's mouth!
        setStretchProgress(0)
        setIsRetracting(false)
        setState('eating')

        // Phase 4: Big iconic D-clan smile
        timeoutRef.current = setTimeout(() => {
          setState('happy')

          // Reset back to idle
          timeoutRef.current = setTimeout(() => {
            setState('idle')
            setMeatPosition(null)
          }, 3800)
        }, 1300)
      }
    }

    animRef.current = requestAnimationFrame(animateStretch)
  }

  // Luffy's actual left shoulder coordinates (viewer's left arm stretching toward the meat)
  // Luffy SVG is 66px-70px wide/tall, sitting at bottom-right of container with p-2 pb-1
  const luffySvgWidth = containerSize.width >= 640 ? 70 : 66
  const luffyShoulderX = Math.round(containerSize.width - 8 - 0.64 * luffySvgWidth)
  const luffyShoulderY = Math.round(containerSize.height - 4 - 0.435 * luffySvgWidth)

  // Calculate current hand position during stretch
  const currentHandX = luffyShoulderX + (targetMeat.x - luffyShoulderX) * stretchProgress
  const currentHandY = luffyShoulderY + (targetMeat.y - luffyShoulderY) * stretchProgress
  const midX = (luffyShoulderX + currentHandX) / 2
  const midY = Math.min(luffyShoulderY, currentHandY) - 10 * Math.sin(stretchProgress * Math.PI)

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={feedLuffy}
      className="relative flex items-end justify-end select-none cursor-pointer group p-2 pb-1 rounded-xl transition-colors duration-200 hover:bg-zinc-100/40 dark:hover:bg-zinc-900/40 w-full max-w-[360px] sm:max-w-[440px] md:max-w-[480px] h-[98px] sm:h-[102px] overflow-hidden"
      title="Hover over the left to bring meat, click to let Luffy stretch and eat it!"
    >
      {/* Speech / Action Bubble placed cleanly ABOVE Luffy's head (Straw hat 100% showing!) */}
      <div className="absolute top-1 sm:top-1.5 right-1 sm:right-2 z-20 pointer-events-none transition-all duration-200">
        {state === 'idle' && (
          <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 bg-white/90 dark:bg-zinc-900/90 px-2.5 py-0.5 rounded-full border border-border/80 shadow-xs whitespace-nowrap">
            hungry... 💭
          </span>
        )}
        {state === 'hovered' && (
          <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 bg-white/90 dark:bg-zinc-900/90 px-2.5 py-0.5 rounded-full border border-border/80 shadow-xs whitespace-nowrap animate-pulse">
            give it to me... 🍖
          </span>
        )}
        {state === 'stretching' && (
          <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 bg-white/90 dark:bg-zinc-900/90 px-2.5 py-0.5 rounded-full border border-border/80 shadow-xs whitespace-nowrap">
            gomu gomu no....
          </span>
        )}
        {state === 'eating' && (
          <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 bg-white/90 dark:bg-zinc-900/90 px-2.5 py-0.5 rounded-full border border-border/80 shadow-xs whitespace-nowrap"> ....
          </span>
        )}
        {state === 'happy' && (
          <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 bg-white/90 dark:bg-zinc-900/90 px-2.5 py-0.5 rounded-full border border-border/80 shadow-xs whitespace-nowrap">
            shishishi... ✨
          </span>
        )}
      </div>

      {/* Floating Meat Drumstick on Hover (Follows cursor inside container) */}
      {state === 'hovered' && meatPosition && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-75 animate-bounce"
          style={{
            left: `${meatPosition.x - 14}px`,
            top: `${Math.max(6, meatPosition.y - 16)}px`,
          }}
        >
          {/* Classic Anime Roasted Meat Drumstick */}
          <svg viewBox="0 0 40 40" className="size-7 sm:size-8 drop-shadow-md">
            <circle cx="6" cy="14" r="3.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="6" cy="20" r="3.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="34" cy="20" r="3.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="34" cy="26" r="3.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            <rect x="6" y="16" width="28" height="4" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.8" />
            <ellipse cx="20" cy="20" rx="14" ry="11" fill="#C2410C" stroke="#9A3412" strokeWidth="1.2" />
            <ellipse cx="19" cy="18" rx="11" ry="8" fill="#EA580C" />
            <path d="M14 14 Q 20 12 25 15" stroke="#FDBA74" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <ellipse cx="20" cy="20" rx="6" ry="4" fill="#9A3412" opacity="0.4" />
          </svg>
        </div>
      )}

      {/* Active Rubber Arm & Snapped Meat during Stretching */}
      {state === 'stretching' && (
        <svg className="absolute inset-0 size-full z-20 pointer-events-none overflow-visible">
          {/* Elastic Rubber Arm Path dynamically extending/retracting */}
          <path
            d={`M ${luffyShoulderX} ${luffyShoulderY} Q ${midX} ${midY} ${currentHandX} ${currentHandY}`}
            stroke="#FDBA74"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner muscle accent line */}
          <path
            d={`M ${luffyShoulderX} ${luffyShoulderY} Q ${midX} ${midY} ${currentHandX} ${currentHandY}`}
            stroke="#EA580C"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Luffy Hand Grabbing */}
          <circle cx={currentHandX} cy={currentHandY} r="5.5" fill="#FDBA74" stroke="#EA580C" strokeWidth="1" />
          <circle cx={currentHandX - 1.8} cy={currentHandY - 3.2} r="2" fill="#FDBA74" />
          <circle cx={currentHandX + 1.8} cy={currentHandY - 4} r="2" fill="#FDBA74" />

          {/* Meat drumstick being carried back when retracting */}
          {isRetracting && (
            <g transform={`translate(${currentHandX - 14}, ${currentHandY - 14}) scale(0.74)`}>
              <circle cx="6" cy="14" r="3.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="6" cy="20" r="3.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="34" cy="20" r="3.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="34" cy="26" r="3.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
              <rect x="6" y="16" width="28" height="4" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.8" />
              <ellipse cx="20" cy="20" rx="14" ry="11" fill="#C2410C" stroke="#9A3412" strokeWidth="1.2" />
              <ellipse cx="19" cy="18" rx="11" ry="8" fill="#EA580C" />
            </g>
          )}
        </svg>
      )}

      {/* Chibi Monkey D. Luffy Character Graphic (Positioned on the Right) */}
      <div className="relative w-[66px] h-[66px] sm:w-[70px] sm:h-[70px] shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 92" className="size-full overflow-visible">
          {/* Shadow */}
          <ellipse cx="50" cy="86" rx="28" ry="4" className="fill-black/15 dark:fill-white/10" />

          {/* Straw Hat string hanging on neck */}
          <path d="M 38 46 Q 50 64 62 46" stroke="#B45309" strokeWidth="1.2" fill="none" />

          {/* Blue pirate shorts */}
          <rect x="36" y="68" width="28" height="13" rx="3.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
          {/* White shorts fluff fringe */}
          <rect x="35" y="78" width="13" height="3" rx="1.5" fill="#FFFFFF" />
          <rect x="52" y="78" width="13" height="3" rx="1.5" fill="#FFFFFF" />

          {/* Sitting Legs & Feet (Straw sandals) */}
          <ellipse cx="38" cy="82" rx="5" ry="3" fill="#FED7AA" />
          <ellipse cx="62" cy="82" rx="5" ry="3" fill="#FED7AA" />
          <path d="M 35 83 Q 38 80 41 83" stroke="#78350F" strokeWidth="1.2" fill="none" />
          <path d="M 59 83 Q 62 80 65 83" stroke="#78350F" strokeWidth="1.2" fill="none" />

          {/* Red Sleeveless Vest */}
          <path d="M 36 50 L 44 50 L 47 70 L 36 70 Z" fill="#DC2626" stroke="#B91C1C" strokeWidth="0.8" />
          <path d="M 64 50 L 56 50 L 53 70 L 64 70 Z" fill="#DC2626" stroke="#B91C1C" strokeWidth="0.8" />
          {/* Yellow Sash / Belt */}
          <rect x="42" y="67" width="16" height="4" rx="1.5" fill="#EAB308" />

          {/* Bare Chest with X-Scar */}
          <rect x="44" y="52" width="12" height="15" fill="#FED7AA" />
          <path d="M 46 56 L 54 64" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 54 56 L 46 64" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" />

          {/* Luffy Arms */}
          {/* Right arm (viewer's right) - stays visible when left arm stretches! */}
          {state === 'eating' ? (
            <path d="M 64 52 Q 68 44 52 48" stroke="#FED7AA" strokeWidth="5" strokeLinecap="round" fill="none" />
          ) : state === 'happy' ? (
            <>
              <path d="M 64 52 Q 76 40 74 26" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <circle cx="74" cy="25" r="3.5" fill="#FED7AA" />
            </>
          ) : (
            <path d="M 64 52 Q 72 60 68 70" stroke="#FED7AA" strokeWidth="5" strokeLinecap="round" fill="none" />
          )}

          {/* Left arm (viewer's left) - stretches toward meat! */}
          {state === 'stretching' ? (
            // Left shoulder socket / sleeve opening on red vest when arm extends
            <g>
              <circle cx="36" cy="52" r="3.2" fill="#DC2626" />
              <circle cx="36" cy="52" r="2.2" fill="#FED7AA" />
            </g>
          ) : state === 'happy' ? (
            <>
              <path d="M 36 52 Q 24 40 26 26" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <circle cx="26" cy="25" r="3.5" fill="#FED7AA" />
            </>
          ) : (
            <path d="M 36 52 Q 28 60 32 70" stroke="#FED7AA" strokeWidth="5" strokeLinecap="round" fill="none" />
          )}

          {/* Back Hair (behind head) */}
          <path
            d="M 30 36 Q 28 26 36 22 Q 50 18 64 22 Q 72 26 70 36 Q 66 45 68 48 L 64 45 Q 50 48 36 45 L 32 48 Q 34 44 30 36 Z"
            fill="#18181B"
          />

          {/* Round Luffy Head / Skin */}
          <circle cx="50" cy="40" r="17" fill="#FED7AA" />

          {/* Ears */}
          <ellipse cx="32" cy="41" rx="2.5" ry="3.5" fill="#FED7AA" stroke="#EA580C" strokeWidth="0.5" />
          <ellipse cx="68" cy="41" rx="2.5" ry="3.5" fill="#FED7AA" stroke="#EA580C" strokeWidth="0.5" />

          {/* Stitch Scar under left eye (viewer's right, at x=56, y=44) */}
          <path d="M 56 43 L 56 47" stroke="#9A3412" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 54.5 44.5 L 57.5 44.5" stroke="#9A3412" strokeWidth="1" strokeLinecap="round" />
          <path d="M 54.5 46 L 57.5 46" stroke="#9A3412" strokeWidth="1" strokeLinecap="round" />

          {/* --- FACE EXPRESSIONS --- */}

          {/* State 1: IDLE (calm, cute, hungry) */}
          {state === 'idle' && (
            <>
              {/* Cute curious eyes */}
              <circle cx="43" cy="37" r="3.2" fill="#18181B" />
              <circle cx="42" cy="36" r="1.1" fill="#FFFFFF" />
              <circle cx="57" cy="37" r="3.2" fill="#18181B" />
              <circle cx="56" cy="36" r="1.1" fill="#FFFFFF" />

              {/* Eyebrows */}
              <path d="M 40 33 Q 44 31 47 33" stroke="#18181B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M 53 33 Q 56 31 60 33" stroke="#18181B" strokeWidth="1.6" strokeLinecap="round" fill="none" />

              {/* Small mouth */}
              <path d="M 47 46 Q 50 44 53 46" stroke="#18181B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              {/* Cute little hungry sweat/drool bead */}
              <circle cx="53" cy="48" r="1.2" fill="#60A5FA" opacity="0.8" />
            </>
          )}

          {/* State 2: HOVERED (Excited starry drooling eyes) */}
          {state === 'hovered' && (
            <>
              <circle cx="43" cy="37" r="4.2" fill="#18181B" />
              <circle cx="42" cy="35.5" r="1.6" fill="#FFFFFF" />
              <circle cx="45" cy="38" r="1" fill="#FFFFFF" />

              <circle cx="57" cy="37" r="4.2" fill="#18181B" />
              <circle cx="56" cy="35.5" r="1.6" fill="#FFFFFF" />
              <circle cx="59" cy="38" r="1" fill="#FFFFFF" />

              <ellipse cx="39" cy="42" rx="3.5" ry="2" fill="#F43F5E" opacity="0.6" />
              <ellipse cx="61" cy="42" rx="3.5" ry="2" fill="#F43F5E" opacity="0.6" />

              {/* Wide excited open smile */}
              <path d="M 44 44 Q 50 51 56 44 Z" fill="#991B1B" stroke="#18181B" strokeWidth="1.2" />
              <ellipse cx="50" cy="47" rx="3" ry="1.5" fill="#FB7185" />
              <path d="M 56 45 Q 58 50 56 52" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* State 3: STRETCHING (Intense focused attack) */}
          {state === 'stretching' && (
            <>
              <circle cx="43" cy="37" r="3.2" fill="#18181B" />
              <circle cx="42" cy="36" r="1" fill="#FFFFFF" />
              <circle cx="57" cy="37" r="3.2" fill="#18181B" />
              <circle cx="56" cy="36" r="1" fill="#FFFFFF" />
              <path d="M 40 33 L 46 35" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
              <path d="M 60 33 L 54 35" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
              <path d="M 45 44 Q 50 50 55 44 Z" fill="#BE123C" stroke="#18181B" strokeWidth="1.4" />
            </>
          )}

          {/* State 4: EATING (Chomping with stuffed cheeks and bone in mouth) */}
          {state === 'eating' && (
            <>
              {/* Cute eating eyes > < */}
              <path d="M 39 35 L 43 37.5 L 39 40" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 61 35 L 57 37.5 L 61 40" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Puffed full round cheeks */}
              <ellipse cx="34" cy="43" rx="5" ry="4" fill="#FED7AA" stroke="#EA580C" strokeWidth="0.8" />
              <ellipse cx="66" cy="43" rx="5" ry="4" fill="#FED7AA" stroke="#EA580C" strokeWidth="0.8" />

              {/* Chewing mouth */}
              <path d="M 43 43 Q 50 50 57 43 Z" fill="#881337" stroke="#18181B" strokeWidth="1.2" />
              {/* Bone in mouth */}
              <rect x="46" y="44" width="18" height="3.5" rx="1.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.8" transform="rotate(-15 50 46)" />
              <circle cx="64" cy="42" r="2.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.8" />
              <circle cx="64" cy="47" r="2.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.8" />
            </>
          )}

          {/* State 5: HAPPY (Pure, wholesome, joyful Luffy anime smile) */}
          {state === 'happy' && (
            <>
              {/* Laughing crescent eyes ^ ^ */}
              <path d="M 39 35 Q 44 30 48 35" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 52 35 Q 56 30 61 35" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Eyebrows */}
              <path d="M 38 31 Q 44 28 48 31" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M 52 31 Q 56 28 62 31" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Soft rosy anime blush */}
              <ellipse cx="37" cy="40" rx="3.5" ry="2" fill="#FB7185" opacity="0.8" />
              <ellipse cx="63" cy="40" rx="3.5" ry="2" fill="#FB7185" opacity="0.8" />

              {/* Cute joyful open laughing mouth (smooth, friendly, NO creepy teeth bars!) */}
              <path
                d="M 40 43 Q 50 55 60 43 Q 50 45 40 43 Z"
                fill="#E11D48"
                stroke="#18181B"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Cute pink tongue */}
              <path
                d="M 44 49 Q 50 45 56 49 Q 50 54 44 49 Z"
                fill="#FDA4AF"
              />

              {/* Dimple lines */}
              <path d="M 39 42 Q 38 44 40 45" stroke="#18181B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M 61 42 Q 62 44 60 45" stroke="#18181B" strokeWidth="1.4" strokeLinecap="round" fill="none" />

              {/* Celebration sparkles */}
              <path d="M 24 24 L 26 19 L 28 24 L 33 26 L 28 28 L 26 33 L 24 28 L 19 26 Z" fill="#F59E0B" className="animate-spin-slow origin-center" />
              <path d="M 76 20 L 78 16 L 80 20 L 84 21 L 80 23 L 78 27 L 76 23 L 72 21 Z" fill="#F59E0B" className="animate-pulse" />
            </>
          )}

          {/* THE ICONIC STRAW HAT (MUGIWARA) - PROPER LAYER ORDER & PLACEMENT */}
          {/* 1. Wide Curved Straw Brim (resting naturally on crown of head at y=20) */}
          <ellipse cx="50" cy="20" rx="28" ry="7.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
          {/* Straw weave textured ring */}
          <ellipse cx="50" cy="20" rx="23" ry="5.5" fill="none" stroke="#D97706" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.6" />

          {/* 2. Straw Hat Crown / Dome (Sitting ON TOP of the brim base - Perfectly Round Dome) */}
          <path
            d="M 34 20 A 16 13 0 0 1 66 20 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.2"
          />

          {/* 3. Iconic Crimson Red Ribbon Band (Vibrant and round across crown base) */}
          <path
            d="M 34 20 L 34.6 15.5 Q 50 18 65.4 15.5 L 66 20 Q 50 22.5 34 20 Z"
            fill="#DC2626"
            stroke="#991B1B"
            strokeWidth="0.8"
          />

          {/* 4. Front Straw Brim Lip */}
          <path d="M 22 20 Q 50 28 78 20" stroke="#D97706" strokeWidth="1.2" fill="none" />

          {/* 5. Front Messy Black Hair Bangs (Sprouting from UNDER the hat brim onto forehead) */}
          <path
            d="M 33 22 L 31 32 L 35 28 L 39 34 L 44 27 L 49 35 L 53 28 L 58 34 L 62 28 L 66 32 L 67 22 Q 50 24 33 22 Z"
            fill="#18181B"
          />
          {/* Sideburn tufts framing ears */}
          <path d="M 31 34 L 26 42 L 32 40 Z" fill="#18181B" />
          <path d="M 69 34 L 74 42 L 68 40 Z" fill="#18181B" />
        </svg>
      </div>
    </div>
  )
}
