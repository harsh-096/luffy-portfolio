import React, { useState, useEffect, useMemo } from 'react'

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ApiResponse {
  total?: {
    [key: string]: number
    lastYear: number
  }
  contributions: ContributionDay[]
}

export const GitHubActivity: React.FC = () => {
  const [data, setData] = useState<ContributionDay[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hoveredCell, setHoveredCell] = useState<{
    date: string
    count: number
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchGitHubContributions = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/harsh-096?y=last')
        if (!res.ok) throw new Error('Failed to fetch contributions')
        const json: ApiResponse = await res.json()

        if (isMounted && json.contributions && json.contributions.length > 0) {
          setData(json.contributions)
          const calculatedTotal = json.total?.lastYear ?? json.contributions.reduce((acc, c) => acc + c.count, 0)
          setTotalCount(calculatedTotal)
          setIsLoading(false)
        }
      } catch (err) {
        console.warn('Using local fallback for GitHub activity:', err)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchGitHubContributions()
    return () => {
      isMounted = false
    }
  }, [])

  // Organize days into weeks of 7 days
  const weeks = useMemo(() => {
    if (data.length === 0) return []
    const weekGroups: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    data.forEach((day, index) => {
      currentWeek.push(day)
      if (currentWeek.length === 7 || index === data.length - 1) {
        weekGroups.push(currentWeek)
        currentWeek = []
      }
    })

    return weekGroups
  }, [data])

  const getCellSvgClass = (level: number, count: number) => {
    if (level === 0 || count === 0) {
      return 'fill-zinc-200/90 dark:fill-zinc-800/80 stroke-black/5 dark:stroke-white/5'
    }
    if (level === 1 || count <= 2) {
      return 'fill-emerald-200 dark:fill-emerald-950/80 stroke-emerald-300 dark:stroke-emerald-800'
    }
    if (level === 2 || count <= 5) {
      return 'fill-emerald-400 dark:fill-emerald-700 stroke-emerald-500 dark:stroke-emerald-600'
    }
    if (level === 3 || count <= 9) {
      return 'fill-emerald-500 dark:fill-emerald-500 stroke-emerald-600 dark:stroke-emerald-400'
    }
    return 'fill-emerald-600 dark:fill-emerald-400 stroke-emerald-700 dark:stroke-emerald-300'
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <section id="github" className="screen-line-before screen-line-after border-x border-edge">
      <header className="screen-line-after px-4 py-3 flex items-center justify-between">
        <h2 className="font-pixel text-2xl sm:text-3xl font-semibold text-foreground">
          GitHub Activity
        </h2>
        <a
          href="https://github.com/harsh-096"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          @harsh-096
        </a>
      </header>

      <div className="p-4 sm:p-5 relative">
        {isLoading ? (
          <div className="flex h-28 w-full items-center justify-center py-2" aria-hidden="true">
            <div className="h-24 w-full animate-pulse rounded-md bg-muted/40"></div>
          </div>
        ) : (
          <>
            {/* Heatmap Grid Container: 100% full view, zero scrollbar */}
            <div className="w-full overflow-hidden">
              <svg
                viewBox="0 0 690 92"
                className="w-full h-auto block select-none overflow-visible"
              >
                {weeks.map((week, wIdx) =>
                  week.map((cell, dIdx) => (
                    <rect
                      key={`${wIdx}-${dIdx}`}
                      x={wIdx * 13}
                      y={dIdx * 13}
                      width={10}
                      height={10}
                      rx={2}
                      ry={2}
                      strokeWidth={0.8}
                      className={`transition-all duration-100 cursor-pointer hover:stroke-foreground ${getCellSvgClass(
                        cell.level,
                        cell.count
                      )}`}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setHoveredCell({
                          date: formatDate(cell.date),
                          count: cell.count,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        })
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))
                )}
              </svg>
            </div>

            {/* Hover Tooltip */}
            {hoveredCell && (
              <div
                className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-mono shadow-md whitespace-nowrap"
                style={{ left: hoveredCell.x, top: hoveredCell.y - 6 }}
              >
                <span className="font-semibold text-foreground">
                  {hoveredCell.count === 0
                    ? 'No contributions'
                    : `${hoveredCell.count} contribution${hoveredCell.count > 1 ? 's' : ''}`}
                </span>{' '}
                <span className="text-muted-foreground">on {hoveredCell.date}</span>
              </div>
            )}

            {/* Stats Row & Color Legend */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-edge/60 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-4 flex-wrap">
                <span>
                  <strong className="text-foreground font-semibold">
                    {totalCount > 0 ? totalCount.toLocaleString() : '221'}
                  </strong>{' '}
                  contributions in the last year
                </span>
                <span className="hidden sm:inline">•</span>
                <span>
                  <strong className="text-foreground font-semibold">21</strong> public repositories
                </span>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto text-[11px]">
                <span>Less</span>
                <div className="size-2.5 rounded-[2px] bg-zinc-200 dark:bg-zinc-800"></div>
                <div className="size-2.5 rounded-[2px] bg-emerald-200 dark:bg-emerald-950"></div>
                <div className="size-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-700"></div>
                <div className="size-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-500"></div>
                <div className="size-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400"></div>
                <span>More</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
