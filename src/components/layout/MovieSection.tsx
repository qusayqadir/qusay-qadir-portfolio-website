const MOVIES = [
  {
    title: 'The Drama',
    poster: '/images/the-drama.jpg',
    director: 'Kristoffer Borgli',
    written: 'Kristoffer Borgli',
    starring: 'Robert Pattinson, Zendaya, Alana Haim',
  },
  {
    title: 'If I Had Legs I\'d Kick You',
    poster: '/images/legs-kick-you.webp',
    director: 'Mary Bronstein',
    written: 'Mary Bronstein',
    starring: 'Rose Byrne, Conan O\'Brien, Danielle Macdonald',
  },
  {
    title: 'Brokeback Mountain',
    poster: '/images/brokeback-mountain.jpg',
    director: 'Ang Lee',
    written: 'Larry McMurtry & Diana Ossana',
    starring: 'Heath Ledger, Jake Gyllenhaal, Anne Hathaway, Michelle Williams',
  },
]

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] font-mono tracking-widest uppercase text-white/60">{label}</span>
    <span className="text-sm font-semibold text-white leading-snug">{value}</span>
  </div>
)

const MovieSection = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {MOVIES.map((movie) => (
        <div key={movie.title} className="flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1">
          <div className="relative group w-full overflow-hidden bg-muted cursor-pointer rounded-sm hover:shadow-xl transition-shadow duration-300">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
            />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-400" />
            {/* metadata */}
            <div className="absolute inset-0 p-5 flex flex-col justify-start gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <MetaRow label="Directed By" value={movie.director} />
              <MetaRow label="Written By" value={movie.written} />
              <MetaRow label="Starring" value={movie.starring} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Want to Watch
            </span>
            <p className="text-2xl font-bold leading-tight">{movie.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieSection
