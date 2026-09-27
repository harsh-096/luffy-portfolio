import React from 'react'
import { Tv, Sparkles } from 'lucide-react'
import { portfolioData, MediaItem } from '../data/portfolioData'

export const FavouritesSection: React.FC = () => {
  const { favourites } = portfolioData

  const animeList = favourites.filter((item) => item.category === 'anime')
  const seriesList = favourites.filter((item) => item.category === 'series')

  const renderMediaCard = (item: MediaItem) => (
    <div key={item.id} className="screen-line-before screen-line-after p-3">
      <div className="group relative aspect-2/3 overflow-hidden rounded-xl border border-border bg-muted shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
        <img
          src={item.image}
          alt={item.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Slide-up title label on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/90 via-black/60 to-transparent p-2.5 pt-6 transition-transform duration-300 group-hover:translate-y-0 [@media(hover:none)]:translate-y-0 flex flex-col justify-end">
          <p className="text-xs sm:text-sm leading-snug font-semibold text-white drop-shadow-sm line-clamp-1">
            {item.title}
          </p>
          {item.year && (
            <span className="text-[10px] font-mono text-zinc-300">
              {item.year}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section id="favourites" className="screen-line-before screen-line-after border-x border-edge min-h-[60vh]">
      {/* Page Title */}
      <header className="screen-line-after px-4 py-3">
        <h1 className="font-pixel text-2xl sm:text-3xl font-semibold text-foreground">
          Favourites
        </h1>
      </header>

      {/* Intro Description */}
      <div className="p-4 border-b border-edge/60">
        <p className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Stories I’ve enjoyed and connected with, across anime and series. Some inspired me, some made me think, and some I just genuinely loved watching.
        </p>
      </div>

      {/* Category 1: Anime */}
      <div className="screen-line-before screen-line-after flex items-center gap-2 px-4 py-2 bg-muted/20">
        <Sparkles className="size-4 text-amber-500" />
        <span className="font-medium text-sm sm:text-base text-foreground">Anime</span>
      </div>

      <div className="relative overflow-hidden py-4">
        {/* Engineering blueprint column divider lines */}
        <div className="pointer-events-none absolute inset-y-0 left-1/3 -z-1 w-px bg-edge max-sm:hidden"></div>
        <div className="pointer-events-none absolute inset-y-0 left-2/3 -z-1 w-px bg-edge max-sm:hidden"></div>
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-1 w-px bg-edge sm:hidden"></div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          {animeList.map(renderMediaCard)}
        </div>
      </div>

      {/* Category 2: Series */}
      <div className="screen-line-before screen-line-after flex items-center gap-2 px-4 py-2 bg-muted/20">
        <Tv className="size-4 text-blue-500" />
        <span className="font-medium text-sm sm:text-base text-foreground">Series</span>
      </div>

      <div className="relative overflow-hidden py-4">
        {/* Engineering blueprint column divider lines */}
        <div className="pointer-events-none absolute inset-y-0 left-1/3 -z-1 w-px bg-edge max-sm:hidden"></div>
        <div className="pointer-events-none absolute inset-y-0 left-2/3 -z-1 w-px bg-edge max-sm:hidden"></div>
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-1 w-px bg-edge sm:hidden"></div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          {seriesList.map(renderMediaCard)}
        </div>
      </div>
    </section>
  )
}
