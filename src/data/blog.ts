// Technical blog content. Add posts here; each section becomes a side-nav
// anchor on the post page.
export interface BlogSection {
  id: string
  heading: string
  body: string[]
}

export interface BlogPostData {
  slug: string
  title: string
  date: string
  summary: string
  sections: BlogSection[]
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    slug: 'blog-1',
    title: 'The F1-Terminal Building Journey',
    date: 'Oct 2, 2026',
    summary: 'Placeholder post — replace with your first technical write-up.',
    sections: [
      { id: 'intro', heading: 'Introduction', body: ['Add your content here.'] },
      { id: 'approach', heading: 'Approach', body: ['Add your content here.'] },
      { id: 'takeaways', heading: 'Takeaways', body: ['Add your content here.'] },
    ],
  }
]
