import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BLOG_POSTS } from '@/data/blog'

// Blog post with a sticky side navigation that highlights the section
// currently in view as the reader scrolls (skiper60-style side scroll nav).
export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)
  const [active, setActive] = useState(post?.sections[0]?.id ?? '')

  useEffect(() => {
    if (!post) return
    const observers = post.sections.map(s => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(s.id) },
        { rootMargin: '-30% 0px -60% 0px' },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [post])

  if (!post) {
    return (
      <section className="blog-index">
        <h2>Not found</h2>
        <Link to="/blog" className="blog-back">← back to blog</Link>
      </section>
    )
  }

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="blog-post">
      <aside className="blog-side-nav">
        <Link to="/blog" className="blog-back">← blog</Link>
        <nav>
          {post.sections.map(s => (
            <span key={s.id}
              className={active === s.id ? 'side-nav-active' : ''}
              onClick={() => go(s.id)}>
              {s.heading}
            </span>
          ))}
        </nav>
      </aside>

      <article className="blog-content">
        <h1>{post.title}</h1>
        <p className="blog-meta">{post.date}</p>
        {post.sections.map(s => (
          <div key={s.id} id={s.id} className="blog-section">
            <h3>{s.heading}</h3>
            {s.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        ))}
      </article>
    </section>
  )
}
