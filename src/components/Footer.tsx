import React from 'react'
import { Eye } from 'lucide-react'
import { CornerTicks } from './CornerTicks'
import { LuffyEasterEgg } from './LuffyEasterEgg'
import { useVisitorCount } from '../hooks/useVisitorCount'

export const Footer: React.FC = () => {
  const { formattedCount } = useVisitorCount()

  return (
    <footer className="max-w-screen overflow-x-hidden px-2 pt-0">
      {/* Top Footer Section with Copyright, Watch Count and Interactive Monkey D. Luffy */}
      <div className="screen-line-before screen-line-after relative mx-auto border-x border-edge pt-1.5 sm:pt-2 md:max-w-4xl">
        <CornerTicks top={false} bottom={true} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 pb-1.5 sm:pb-2 gap-2 sm:gap-4">
          <div className="flex flex-col leading-tight shrink-0 my-0.5 gap-1.5">
            <span className="font-mono text-xs text-muted-foreground font-medium">
              © {new Date().getFullYear()} Harsh Parmar
            </span>
            <span className="font-mono text-[11px] text-muted-foreground/80">
              Built with love, LLMs and Coffee
            </span>
            {/* Live Watch / Visitor Counter Badge */}
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-edge bg-muted/40 dark:bg-muted/20 font-mono text-[11px] text-muted-foreground select-none shadow-xs">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <Eye className="size-3 text-muted-foreground/80" />
                <span className="text-foreground font-semibold font-mono">{formattedCount}</span>
                <span className="text-muted-foreground/80">views</span>
              </span>
            </div>
          </div>

          {/* Interactive Monkey D. Luffy Easter Egg with wide left feeding area */}
          <div className="flex-1 flex justify-end w-full sm:w-auto">
            <LuffyEasterEgg />
          </div>
        </div>
      </div>

      {/* Bottom Engineering Dot Matrix Banner */}
      <div className="mx-auto md:max-w-4xl">
        <div className="border-x border-edge select-none screen-line-before screen-line-after before:-top-px after:-bottom-px">
          <div className="overflow-hidden p-5">
            <div className="h-full min-h-[70px] w-full dot-grid sm:min-h-[100px] rounded-xs border border-edge/30"></div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <div className="h-[2px]"></div>
      </div>
    </footer>
  )
}
