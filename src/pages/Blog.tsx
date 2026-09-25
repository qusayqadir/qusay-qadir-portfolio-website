import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '@/data/blog'

// Index of technical blog posts — styled like the experience/projects lists.
export default function Blog() {
  return (
    <section id="blog-list">
      <h2>blog</h2>
      <div className="item-list">
        {BLOG_POSTS.map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="item">
            {post.title}
            <span className="item-sub">{post.date} &middot; {post.summary}</span>
          </Link>
        ))}
      </div>
      <Link to="/" className="blog-back">← back home</Link>
    </section>
  )
}
