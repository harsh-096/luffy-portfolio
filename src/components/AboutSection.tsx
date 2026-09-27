import React from 'react'
import { Music } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import { useLastFm } from '../hooks/useLastFm'

export const AboutSection: React.FC = () => {
  const { about } = portfolioData
  const { track } = useLastFm()

  return (
    <section id="about" className="screen-line-before screen-line-after border-x border-edge">
      <header className="screen-line-after px-4 py-3">
        <h2 className="font-pixel text-2xl sm:text-3xl font-semibold text-foreground">
          About
        </h2>
      </header>

      <div className="p-4 sm:p-5 space-y-6">
        {/* Prose text */}
        <div className="space-y-3 font-mono text-xs sm:text-sm text-foreground/90 leading-relaxed">
          {about.paragraphs.map((p, idx) => (
            <p key={idx} className="flex gap-2">
              <span className="text-muted-foreground select-none">•</span>
              <span>{p}</span>
            </p>
          ))}
        </div>

        {/* Spotify Track Card Widget (Live Last.fm Integration) */}
        <div className="mx-auto w-full max-w-sm pt-2">
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 px-4 py-3 text-sm shadow-xs transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 hover:border-[#1DB954]/40 hover:shadow-md active:scale-[0.98] cursor-pointer select-none"
            title={`${track.title} by ${track.artist} on Spotify`}
          >
            {/* Vinyl Record */}
            <div className="relative size-16 shrink-0" aria-hidden="true">
              <div
                className={`size-full relative transition-transform duration-500 ${
                  track.isNowPlaying ? 'animate-spin-slow' : 'group-hover:rotate-45'
                }`}
              >
                {/* Vinyl Base */}
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-neutral-800 via-neutral-900 to-black shadow-lg"></div>
                {/* Vinyl grooves */}
                <div
                  className="absolute inset-0 rounded-full opacity-35 mix-blend-screen pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.12) 15%, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%, rgba(255,255,255,0.15) 85%, transparent 100%)',
                  }}
                ></div>
                {/* Vinyl center label with Album Art */}
                <div className="absolute inset-[6px] overflow-hidden rounded-full bg-neutral-800 border border-neutral-700/80 flex items-center justify-center">
                  {track.albumArtUrl ? (
                    <img
                      src={track.albumArtUrl}
                      alt={track.title}
                      className="size-full rounded-full object-cover"
                    />
                  ) : (
                    <Music className="size-4 text-muted-foreground" />
                  )}
                </div>
                {/* Center spindle hole */}
                <div className="absolute inset-[26px] rounded-full bg-black border border-white/20 z-10"></div>
              </div>
            </div>

            {/* Track Info */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-tight">
              <div className="flex items-center gap-1.5 text-xs">
                <span
                  className={`size-1.5 rounded-full transition-colors ${
                    track.isNowPlaying
                      ? 'bg-[#1DB954] animate-pulse shadow-[0_0_6px_#1DB954]'
                      : 'bg-neutral-400 dark:bg-neutral-600'
                  }`}
                ></span>
                <span
                  className={`font-mono text-[11px] font-medium transition-colors ${
                    track.isNowPlaying
                      ? 'text-[#1DB954]'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {track.isNowPlaying
                    ? 'Now Playing · Spotify'
                    : `Last Played • ${track.playedAt || 'Recently'}`}
                </span>
              </div>
              <span className="truncate text-sm font-semibold text-foreground group-hover:text-[#1DB954] transition-colors flex items-center gap-1">
                <span className="truncate">{track.title}</span>
                <span className="text-[10px] text-muted-foreground font-mono shrink-0">↗</span>
              </span>
              <span className="text-[11px] font-mono text-muted-foreground truncate">
                {track.artist} {track.album ? `• ${track.album}` : ''}
              </span>
            </div>

            {/* Spotify Brand Logo */}
            <div className="shrink-0 size-9 rounded-full bg-[#1DB954]/10 dark:bg-[#1DB954]/15 border border-[#1DB954]/30 flex items-center justify-center text-[#1DB954] group-hover:scale-105 group-hover:bg-[#1DB954] group-hover:text-black transition-all">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
                aria-label="Spotify"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
