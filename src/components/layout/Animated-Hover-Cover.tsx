import { type ReactNode } from 'react'

interface CardSpotlightDemoProps {
  role: string
  company: string
  location: string
  date?: string
  description: ReactNode
}

export const CardSpotlightDemo = ({ role, company, location, date, description }: CardSpotlightDemoProps) => {
  return (
    <div className='w-full rounded-xl border p-5 flex flex-col gap-3 hover:shadow-md hover:scale-[1.01] transition-all duration-200'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-0.5'>
          <p className='text-xs font-mono tracking-widest uppercase text-muted-foreground'>{company} · {location}</p>
          <h3 className='text-lg font-bold leading-snug'>{role}</h3>
        </div>
        {date && (
          <span className='text-xs text-muted-foreground font-mono shrink-0 mt-1'>{date}</span>
        )}
      </div>
      <div className='text-sm text-muted-foreground leading-relaxed'>{description}</div>
    </div>
  )
}
