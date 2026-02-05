'use client'

import { useEffect, type ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CardSpotlightDemoProps {
  title: ReactNode
  description: ReactNode
  date?: ReactNode
}

export const CardSpotlightDemo = ({ title, description, date }: CardSpotlightDemoProps) => {
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
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - rec.width / 2
              }px, ${ev.clientY - rec.top - rec.height / 2}px)`
            }
          ],
          {
            duration: 300,
            fill: 'forwards'
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className='w-full'>
      <div className='spotlight-card group bg-border relative overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
        <Card className='group-hover:bg-card/90 w-full border-none transition-all duration-300 ease-in-out group-hover:backdrop-blur-[20px]'>
          <CardHeader>
            <div className='flex items-start justify-between gap-2'>
              <CardTitle className='max-w-[80%]'>
                <p className="whitespace-pre-line">{title}</p>
              </CardTitle>
              {date && (
                <div className='text-sm text-muted-foreground text-right shrink-0'>
                  {date}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{description}</p>
          </CardContent>
        </Card>
        <div className='blob absolute top-0 left-0 size-20 rounded-full bg-sky-600/60 opacity-0 blur-2xl transition-all duration-300 ease-in-out dark:bg-sky-400/60' />
        <div className='fake-blob absolute top-0 left-0 size-20 rounded-full' />
      </div>
    </div>
  )
}