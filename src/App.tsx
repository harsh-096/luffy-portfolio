import React, { useState } from 'react'
import { Header, ActiveTab } from './components/Header'
import { AvatarBanner } from './components/AvatarBanner'
import { AboutSection } from './components/AboutSection'
import { ConnectSection } from './components/ConnectSection'
import { GitHubActivity } from './components/GitHubActivity'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { EducationSection } from './components/EducationSection'
import { FavouritesSection } from './components/FavouritesSection'
import { QuoteSection } from './components/QuoteSection'
import { BlogSection } from './components/BlogSection'
import { Footer } from './components/Footer'
import { CommandPalette } from './components/CommandPalette'

export const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home')

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Sticky Header with ⌘K, Theme Toggle, and Hover Pop-Out on More */}
      <Header
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Main Content Area bounded to md:max-w-4xl */}
      <main className="max-w-screen overflow-x-hidden px-2 flex-1">
        <div className="mx-auto md:max-w-4xl">
          {currentTab === 'home' && (
            <>
              {/* Dot Grid Banner + Profile Header */}
              <AvatarBanner />

              {/* About Section with Vinyl Player */}
              <AboutSection />

              <div className="hatch-strip"></div>

              {/* Experience Section */}
              <ExperienceSection />

              <div className="hatch-strip"></div>

              {/* Education Section */}
              <EducationSection />

              <div className="hatch-strip"></div>

              {/* Connect Section */}
              <ConnectSection />

              <div className="hatch-strip"></div>

              {/* GitHub Activity with Live API */}
              <GitHubActivity />

              <div className="hatch-strip"></div>

              {/* Monkey D. Luffy Quote Section */}
              <QuoteSection />

              <div className="hatch-strip"></div>
            </>
          )}

          {currentTab === 'projects' && (
            <div className="pt-2">
              <div className="hatch-strip"></div>
              {/* Projects view with embedded Skills & Tech Stack */}
              <ProjectsSection />
              <div className="hatch-strip"></div>
            </div>
          )}

          {currentTab === 'favourites' && (
            <div className="pt-2">
              <div className="hatch-strip"></div>
              <FavouritesSection />
              <div className="hatch-strip"></div>
            </div>
          )}

          {currentTab === 'blog' && (
            <div className="pt-2">
              <div className="hatch-strip"></div>
              <BlogSection />
              <div className="hatch-strip"></div>
            </div>
          )}

          {currentTab === 'experience' && (
            <div className="pt-2">
              <div className="hatch-strip"></div>
              <ExperienceSection />
              <div className="hatch-strip"></div>
            </div>
          )}

          {currentTab === 'education' && (
            <div className="pt-2">
              <div className="hatch-strip"></div>
              <EducationSection />
              <div className="hatch-strip"></div>
            </div>
          )}
        </div>
      </main>

      {/* Footer with Pixel Cat and Bottom Dot Matrix */}
      <Footer />

      {/* Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSwitchTab={setCurrentTab}
      />
    </div>
  )
}

export default App
