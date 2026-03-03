export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Photo {
  id: string
  title: string
  slug: string
  metadata: {
    description?: string
    image?: CosmicImage
    camera?: string
    location?: string
  }
  created_at: string
}

export interface Collection {
  id: string
  title: string
  slug: string
  metadata: {
    description?: string
    cover_image?: CosmicImage
    photos?: Photo[]
  }
  created_at: string
}

export interface About {
  id: string
  title: string
  slug: string
  metadata: {
    tagline?: string
    bio?: string
    portrait?: CosmicImage
  }
  created_at: string
}

export interface Testimonial {
  id: string
  title: string
  slug: string
  metadata: {
    quote?: string
    client_name?: string
    company?: string
    avatar?: CosmicImage
  }
  created_at: string
}

export interface BlogAuthor {
  id: string
  title: string
  slug: string
  metadata: {
    bio?: string
    avatar?: CosmicImage
    role?: string
    website?: string
    twitter?: string
  }
  created_at: string
}

export interface BlogCategory {
  id: string
  title: string
  slug: string
  metadata: {
    description?: string
    color?: string
  }
  created_at: string
}

export interface BlogTag {
  id: string
  title: string
  slug: string
  metadata: {
    description?: string
  }
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  metadata: {
    excerpt?: string
    content?: string
    featured_image?: CosmicImage
    author?: BlogAuthor
    category?: BlogCategory
    tags?: BlogTag[]
    published_date?: string
    read_time?: string
  }
  created_at: string
}

export interface PaginatedResponse<T> {
  objects: T[]
  total: number
}