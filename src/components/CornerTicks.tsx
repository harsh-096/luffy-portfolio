import React from 'react'

interface CornerTicksProps {
  top?: boolean
  bottom?: boolean
}

export const CornerTicks: React.FC<CornerTicksProps> = ({ top = true, bottom = false }) => {
  return (
    <>
      {top && (
        <>
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="relative flex size-3 items-center justify-center">
              <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-600"></div>
              <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-600"></div>
            </div>
          </div>
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="relative flex size-3 items-center justify-center">
              <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-600"></div>
              <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-600"></div>
            </div>
          </div>
        </>
      )}
      {bottom && (
        <>
          <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 pointer-events-none z-20">
            <div className="relative flex size-3 items-center justify-center">
              <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-600"></div>
              <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-600"></div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 pointer-events-none z-20">
            <div className="relative flex size-3 items-center justify-center">
              <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-600"></div>
              <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-600"></div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
