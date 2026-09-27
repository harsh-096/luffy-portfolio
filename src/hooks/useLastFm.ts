import { useState, useEffect } from 'react'
import { portfolioData } from '../data/portfolioData'

export interface TrackData {
  title: string
  artist: string
  album: string
  songUrl: string
  albumArtUrl: string
  isNowPlaying: boolean
  playedAt?: string
}

const LAST_FM_USER = 'harsh_096'
const LAST_FM_API_KEY = '5591a98ec99bb5ddf5ef1e9b598469a2'
const LAST_FM_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USER}&api_key=${LAST_FM_API_KEY}&format=json&limit=1`

export function useLastFm() {
  const [track, setTrack] = useState<TrackData>(() => ({
    title: portfolioData.nowPlaying.title,
    artist: portfolioData.nowPlaying.artist,
    album: portfolioData.nowPlaying.album,
    songUrl: portfolioData.nowPlaying.songUrl,
    albumArtUrl: portfolioData.nowPlaying.albumArtUrl,
    isNowPlaying: false,
  }))
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    const fetchLastTrack = async () => {
      try {
        const res = await fetch(LAST_FM_ENDPOINT)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        const recentTrack = data?.recenttracks?.track?.[0]
        if (!recentTrack || !isMounted) return

        const isNowPlaying = recentTrack['@attr']?.nowplaying === 'true'
        const artist = recentTrack.artist?.['#text'] || recentTrack.artist?.name || 'The Weeknd'
        const title = recentTrack.name || 'Die For You'
        const album = recentTrack.album?.['#text'] || 'Starboy'

        // Extract highest resolution album artwork
        const images = recentTrack.image || []
        const extraLargeImg = images.find((img: { size: string; '#text': string }) => img.size === 'extralarge')?.['#text']
        const largeImg = images.find((img: { size: string; '#text': string }) => img.size === 'large')?.['#text']
        const mediumImg = images.find((img: { size: string; '#text': string }) => img.size === 'medium')?.['#text']
        const rawArt = extraLargeImg || largeImg || mediumImg
        const albumArtUrl = (rawArt && rawArt.trim() !== '') ? rawArt : portfolioData.nowPlaying.albumArtUrl

        // Song URL: direct to Spotify search for seamless listening
        const songUrl = `https://open.spotify.com/search/${encodeURIComponent(`${title} ${artist}`)}`

        // Relative time formatting
        let playedAt = 'Recently'
        if (recentTrack.date?.uts) {
          const timestamp = parseInt(recentTrack.date.uts, 10) * 1000
          const diffMinutes = Math.floor((Date.now() - timestamp) / 60000)
          if (diffMinutes < 1) {
            playedAt = 'Just now'
          } else if (diffMinutes < 60) {
            playedAt = `${diffMinutes}m ago`
          } else if (diffMinutes < 1440) {
            const hours = Math.floor(diffMinutes / 60)
            playedAt = `${hours}h ago`
          } else {
            const days = Math.floor(diffMinutes / 1440)
            playedAt = `${days}d ago`
          }
        }

        setTrack({
          title,
          artist,
          album,
          songUrl,
          albumArtUrl,
          isNowPlaying,
          playedAt,
        })
      } catch (err) {
        console.warn('Could not fetch latest track from Last.fm, using default fallback:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchLastTrack()
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchLastTrack, 30000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  return { track, isLoading }
}
