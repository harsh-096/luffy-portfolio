import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, Moon, Sun, Search } from 'lucide-react'

export type ActiveTab = 'home' | 'projects' | 'favourites' | 'experience' | 'education' | 'blog'

interface HeaderProps {
  onOpenCommandPalette: () => void
  currentTab: ActiveTab
  setCurrentTab: (tab: ActiveTab) => void
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  currentTab,
  setCurrentTab,
}) => {
  const [isDark, setIsDark] = useState<boolean>(true)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)
  const hoverTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsMoreOpen(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMoreOpen(false)
    }, 180)
  }

  const selectTab = (tab: ActiveTab) => {
    setCurrentTab(tab)
    setIsMoreOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background/95 backdrop-blur-md px-2 pt-2 transition-shadow duration-300">
      <div
        className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-3 sm:gap-4 md:max-w-4xl"
        data-header-container="true"
      >
        {/* Monogram Brand Icon */}
        <button
          onClick={() => selectTab('home')}
          className="flex items-center gap-2 group transition-transform ease-out active:scale-95 cursor-pointer"
          aria-label="Home"
        >
          <div className="size-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-950 font-pixel text-xs font-bold shadow-xs border border-zinc-700/50">
            HP
          </div>
          <span className="hidden sm:inline font-mono text-xs font-semibold tracking-tight text-foreground">
            harshparmar.tech
          </span>
        </button>

        <div className="flex-1"></div>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-4 max-sm:hidden">
          <button
            onClick={() => selectTab('home')}
            className={`font-mono text-sm font-medium transition-colors duration-200 cursor-pointer ${
              currentTab === 'home'
                ? 'text-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => selectTab('projects')}
            className={`font-mono text-sm font-medium transition-colors duration-200 cursor-pointer ${
              currentTab === 'projects'
                ? 'text-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Projects
          </button>

          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            aria-label="View Resume PDF"
          >
            <span>Resume</span>
            <span className="text-[10px] text-muted-foreground font-mono">↗</span>
          </a>

          {/* More Hover Dropdown & Pop-out Card */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`flex items-center gap-1 font-mono text-sm font-medium transition-colors duration-200 outline-none hover:text-foreground cursor-pointer ${
                currentTab !== 'home' && currentTab !== 'projects'
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground'
              }`}
            >
              <span>More</span>
              <ChevronDown
                className={`size-3 transition-transform duration-200 ${
                  isMoreOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Pop-Out Selection Card */}
            {isMoreOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 duration-150 font-mono"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="space-y-0.5">
                  {/* Blog */}
                  <button
                    onClick={() => selectTab('blog')}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer ${
                      currentTab === 'blog'
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    <span>Blog</span>
                  </button>

                  {/* Favourites */}
                  <button
                    onClick={() => selectTab('favourites')}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer ${
                      currentTab === 'favourites'
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    <span>Favourites</span>
                  </button>
                </div>

                {/* Resume download link */}
                <div className="mt-1 pt-1 border-t border-border">
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span>Resume (PDF)</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Search Command Palette Trigger & Theme Toggle */}
        <div className="flex items-center">
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="inline-flex items-center justify-center text-sm font-medium whitespace-nowrap transition-all ease-out outline-none active:scale-[0.98] h-8 gap-1.5 rounded-full border border-input bg-card px-2.5 text-muted-foreground shadow-xs select-none hover:bg-accent cursor-pointer"
            aria-label="Search portfolio"
          >
            <Search className="size-3.5 text-muted-foreground" />
            <span className="font-sans text-xs font-medium sm:hidden">Search</span>

            <div className="hidden sm:flex items-center gap-0.5 ml-1">
              <kbd className="pointer-events-none inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-black/5 dark:bg-white/10 px-1 font-mono text-[11px] font-normal text-muted-foreground shadow-xs">
                {isMac ? '⌘' : 'Ctrl'}
              </kbd>
              <kbd className="pointer-events-none inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-black/5 dark:bg-white/10 px-1 font-mono text-[11px] font-normal text-muted-foreground shadow-xs">
                K
              </kbd>
            </div>
          </button>

          <span className="mx-2 flex h-4 w-px bg-border" aria-hidden="true"></span>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            className="inline-flex items-center justify-center rounded-lg size-8 text-muted-foreground hover:bg-accent hover:text-foreground transition-transform active:scale-95 cursor-pointer outline-none"
            aria-label="Toggle Theme"
          >
            <div className="relative size-full flex items-center justify-center">
              {isDark ? (
                <Moon className="size-4.5 text-zinc-300 transition-all duration-300" />
              ) : (
                <Sun className="size-4.5 text-amber-500 transition-all duration-300" />
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
