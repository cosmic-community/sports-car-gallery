import { createBucketClient } from '@cosmicjs/sdk'
import type { Photo, Collection, About, Testimonial } from '@/types'

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