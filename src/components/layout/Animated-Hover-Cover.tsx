'use client'

import { useEffect, type ReactNode } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CardSpotlightDemoProps {
  role: string
  company: string
  location: string
  date?: string
  description: ReactNode
}

export const CardSpotlightDemo = ({ role, company, location, date, description }: CardSpotlightDemoProps) => {
  useEffect(() => {
    const all = document.querySelectorAll('.spotlight-card')

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach(e => {
        const blob = e.querySelector('.blob') as HTMLElement
        const fblob = e.querySelector('.fake-blob') as HTMLElement
        if (!blob || !fblob) return
        const rec = fblob.getBoundingClientRect()
        blob.style.opacity = '1'
        blob.animate(
          [{ transform: `translate(${ev.clientX - rec.left - rec.width / 2}px, ${ev.clientY - rec.top - rec.height / 2}px)` }],
          { duration: 300, fill: 'forwards' }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='w-full'>
      <div className='spotlight-card group bg-border relative overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl'>
        <Card className='group-hover:bg-card/90 w-full border-none transition-all duration-300 ease-in-out group-hover:backdrop-blur-[20px]'>
          <CardHeader className='pb-2'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex flex-col gap-0.5'>
                <p className='text-xs font-mono tracking-widest uppercase text-muted-foreground'>{company} · {location}</p>
                <h3 className='text-lg font-bold leading-snug'>{role}</h3>
              </div>
              {date && (
                <span className='text-xs text-muted-foreground font-mono shrink-0 mt-1'>{date}</span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-sm text-muted-foreground leading-relaxed'>{description}</div>
          </CardContent>
        </Card>
        <div className='blob absolute top-0 left-0 size-20 rounded-full bg-sky-600/60 opacity-0 blur-2xl transition-all duration-300 ease-in-out dark:bg-sky-400/60' />
        <div className='fake-blob absolute top-0 left-0 size-20 rounded-full' />
      </div>
    </div>
  )
}
