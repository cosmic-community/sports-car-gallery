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