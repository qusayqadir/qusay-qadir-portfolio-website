const TRACKS = [
  {
    title: 'The Universal',
    artist: 'Blur',
    embedSrc: 'https://embed.music.apple.com/us/song/the-universal/699617113',
  },
  {
    title: 'Lagos Love',
    artist: 'Tems',
    embedSrc: 'https://embed.music.apple.com/us/song/lagos-love/1853635935',
  },
  {
    title: 'Fireworks',
    artist: 'Drake',
    embedSrc: 'https://embed.music.apple.com/us/song/fireworks-feat-alicia-keys/1440762504',
  },
]

const MusicSection = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      {TRACKS.map((track) => (
        <div
          key={track.title}
          className="rounded-xl overflow-hidden"
        >
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            height="175"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={track.embedSrc}
            className="w-full rounded-xl"
            title={`${track.title} by ${track.artist}`}
          />
        </div>
      ))}
    </div>
  )
}

export default MusicSection
