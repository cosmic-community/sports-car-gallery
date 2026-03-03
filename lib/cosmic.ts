import { createBucketClient } from '@cosmicjs/sdk'
import type {
  Photo,
  Collection,
  About,
  Testimonial,
  BlogPost,
  BlogCategory,
  BlogTag,
  BlogAuthor,
  PaginatedResponse,
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

// ============================================================
// Photos
// ============================================================

export async function getPhotos(): Promise<Photo[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'photos' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Photo[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch photos');
  }
}

export async function getPhotoBySlug(slug: string): Promise<Photo | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'photos', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.object || null) as Photo | null;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch photo');
  }
}

// ============================================================
// Collections
// ============================================================

export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)

    return (response.objects || []) as Collection[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch collections');
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)

    return (response.object || null) as Collection | null;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch collection');
  }
}

// ============================================================
// About
// ============================================================

export async function getAbout(): Promise<About | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'about' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const objects = response.objects as About[];
    if (!objects || objects.length === 0) {
      return null;
    }

    return objects[0] ?? null;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch about');
  }
}

// ============================================================
// Testimonials
// ============================================================

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Testimonial[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

// ============================================================
// Blog Posts
// ============================================================

const BLOG_PROPS = ['id', 'title', 'slug', 'metadata', 'created_at'] as const

export async function getBlogPosts(
  page: number = 1,
  limit: number = 6
): Promise<PaginatedResponse<BlogPost>> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props([...BLOG_PROPS])
      .depth(2)
      .limit(limit)
      .skip((page - 1) * limit)

    const posts = (response.objects || []) as BlogPost[]
    const total = response.total ?? 0

    // Sort by published_date descending
    posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime()
      return dateB - dateA
    })

    return { objects: posts, total }
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return { objects: [], total: 0 }
    }
    throw new Error('Failed to fetch blog posts')
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props([...BLOG_PROPS])
      .depth(2)

    const posts = (response.objects || []) as BlogPost[]

    posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime()
      return dateB - dateA
    })

    return posts
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch all blog posts')
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-posts', slug })
      .props([...BLOG_PROPS])
      .depth(2)

    return (response.object || null) as BlogPost | null
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog post')
  }
}

export async function getBlogPostsByCategory(categoryId: string): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts', 'metadata.category': categoryId })
      .props([...BLOG_PROPS])
      .depth(2)

    const posts = (response.objects || []) as BlogPost[]

    posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime()
      return dateB - dateA
    })

    return posts
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog posts by category')
  }
}

export async function getBlogPostsByTag(tagId: string): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts', 'metadata.tags': tagId })
      .props([...BLOG_PROPS])
      .depth(2)

    const posts = (response.objects || []) as BlogPost[]

    posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime()
      return dateB - dateA
    })

    return posts
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog posts by tag')
  }
}

export async function getBlogPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts', 'metadata.author': authorId })
      .props([...BLOG_PROPS])
      .depth(2)

    const posts = (response.objects || []) as BlogPost[]

    posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime()
      return dateB - dateA
    })

    return posts
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog posts by author')
  }
}

export async function getRelatedPosts(
  currentSlug: string,
  categoryId?: string,
  limit: number = 3
): Promise<BlogPost[]> {
  try {
    let posts: BlogPost[] = []

    // First try to get posts from the same category
    if (categoryId) {
      const response = await cosmic.objects
        .find({ type: 'blog-posts', 'metadata.category': categoryId })
        .props([...BLOG_PROPS])
        .depth(2)
        .limit(limit + 1)

      posts = (response.objects || []) as BlogPost[]
    }

    // Filter out the current post
    posts = posts.filter((p) => p.slug !== currentSlug)

    // If we don't have enough, fetch more posts
    if (posts.length < limit) {
      const response = await cosmic.objects
        .find({ type: 'blog-posts' })
        .props([...BLOG_PROPS])
        .depth(2)
        .limit(limit + 1)

      const morePosts = (response.objects || []) as BlogPost[]
      const existingSlugs = new Set(posts.map((p) => p.slug))
      existingSlugs.add(currentSlug)

      for (const post of morePosts) {
        if (!existingSlugs.has(post.slug) && posts.length < limit) {
          posts.push(post)
        }
      }
    }

    return posts.slice(0, limit)
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    return []
  }
}

// ============================================================
// Blog Categories
// ============================================================

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-categories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as BlogCategory[]
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog categories')
  }
}

export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-categories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.object || null) as BlogCategory | null
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog category')
  }
}

// ============================================================
// Blog Tags
// ============================================================

export async function getBlogTags(): Promise<BlogTag[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-tags' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as BlogTag[]
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog tags')
  }
}

export async function getBlogTagBySlug(slug: string): Promise<BlogTag | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-tags', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.object || null) as BlogTag | null
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog tag')
  }
}

// ============================================================
// Blog Authors
// ============================================================

export async function getBlogAuthors(): Promise<BlogAuthor[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-authors' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as BlogAuthor[]
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog authors')
  }
}

export async function getBlogAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-authors', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.object || null) as BlogAuthor | null
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog author')
  }
}