import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface ScrollPlayheadProps<T extends { id: string }> {
  sectionId: string
  title: string
  items: T[]
  itemHeight?: number
  renderLabel: (item: T) => ReactNode
  renderDetail: (item: T) => ReactNode
  listAriaLabel?: string
}

const PLAYHEAD_RATIO = 0.375

export default function ScrollPlayhead<T extends { id: string }>({
  sectionId,
  title,
  items,
  itemHeight = 54,
  renderLabel,
  renderDetail,
  listAriaLabel = `${title} items`,
}: ScrollPlayheadProps<T>) {
  const [activeId, setActiveId] = useState<string>(items[0].id)
  const [translateY, setTranslateY] = useState(0)
  const [listMarginTop, setListMarginTop] = useState(0)

  const wrapRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const rafRef = useRef<number | null>(null)

  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const playheadY = window.innerHeight * PLAYHEAD_RATIO
    const listTop = list.getBoundingClientRect().top
    const marginNeeded = Math.max(0, playheadY - listTop)

    setListMarginTop(marginNeeded)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null

        const wrap = wrapRef.current
        const list = listRef.current
        if (!wrap || !list) return

        const { top, height } = wrap.getBoundingClientRect()
        const scrollRange = height - window.innerHeight

        if (top > 0 || -top > scrollRange) return

        const scrolled = -top
        const maxTranslate = (items.length - 1) * itemHeight
        const ty = Math.max(
          0,
          Math.min(maxTranslate, (scrolled / scrollRange) * maxTranslate)
        )

        const playheadY = window.innerHeight * PLAYHEAD_RATIO
        const listTop = list.getBoundingClientRect().top
        const relativeY = playheadY - listTop
        const idx = Math.max(
          0,
          Math.min(items.length - 1, Math.floor(relativeY / itemHeight))
        )

        setTranslateY(ty)
        setActiveId(items[idx].id)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [items, itemHeight])

  return (
    <div
      id={sectionId}
      ref={wrapRef}
      style={{ minHeight: `${items.length * 60 + 100}dvh` }}
    >
      <section className="scroll-section">
        <h2>{title}</h2>

        <div className="item-list" style={{ position: 'relative' }}>
          <div className="playhead-bar" aria-hidden="true" />

          <ul
            ref={listRef}
            className="playhead-list"
            aria-label={listAriaLabel}
            style={{
              marginTop: listMarginTop,
              transform: prefersReducedMotion.current
                ? undefined
                : `translateY(${-translateY}px)`,
              willChange: 'transform',
            }}
          >
            {items.map(item => (
              <li
                key={item.id}
                className={`item${activeId === item.id ? ' selected' : ''}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                onClick={() => setActiveId(item.id)}
              >
                {renderLabel(item)}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="detail-panel"
          aria-live="polite"
          aria-label={`${title} detail`}
        >
          {items.map(item =>
            activeId === item.id ? (
              <div key={item.id}>{renderDetail(item)}</div>
            ) : null
          )}
        </div>
      </section>
    </div>
  )
}
