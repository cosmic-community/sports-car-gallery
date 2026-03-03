export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicMedia {
  url: string;
  imgix_url: string;
}

export interface Photo extends CosmicObject {
  type: 'photos';
  metadata: {
    description?: string;
    image?: CosmicMedia;
    camera?: string;
    location?: string;
  };
}

export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    description?: string;
    cover_image?: CosmicMedia;
    photos?: Photo[];
  };
}

export interface About extends CosmicObject {
  type: 'about';
  metadata: {
    tagline?: string;
    bio?: string;
    portrait?: CosmicMedia;
  };
}

export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    quote?: string;
    client_name?: string;
    company?: string;
    avatar?: CosmicMedia;
  };
}

// Changed: Merged all blog types from types/index.ts into this file to resolve module resolution conflict

export interface CosmicImage {
  url: string
  imgix_url: string
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