# Sports Car Gallery

![App Preview](https://imgix.cosmicjs.com/283cd130-1721-11f1-95d6-291bc45ac05c-autopilot-photo-1573496359142-b8d87734a5a2-1772556660091.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A stunning sports car photography portfolio powered by [Cosmic](https://www.cosmicjs.com) CMS. Built with Next.js 16, Tailwind CSS, and TypeScript, this sleek gallery website features immersive full-screen photo views, curated collections, photographer bio, and client testimonials — all wrapped in a dark, motorsport-inspired design.

## Features

- 🏎️ **Immersive Photo Gallery** — Browse stunning automotive photography with lightbox viewing
- 🖼️ **Curated Collections** — Themed photo sets with cover images and descriptions
- 👤 **About Section** — Dynamic photographer profile with portrait and bio
- ⭐ **Client Testimonials** — Elegant testimonial cards with ratings and avatars
- 📱 **Fully Responsive** — Mobile-first design optimized for all screen sizes
- ⚡ **Server-Side Rendered** — Lightning-fast loads with Next.js 16 App Router
- 🎨 **Dark Motorsport Theme** — Cinematic dark UI with vibrant red accents
- 🔍 **Image Optimization** — Automatic imgix optimization for crisp, fast-loading images

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a71111fa2ad19da1888d01&clone_repository=69a712802a27aae127fda8a2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a photography portfolio with photo galleries, collections, an about section, and client testimonials.
>
> User instructions: A sportscar gallery website. Modern, sleek, mobile responsive. Beautiful galleries."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'Sports Car Gallery'. The content is managed in Cosmic CMS with the following object types: photos, collections, about, testimonials. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A sportscar gallery website. Modern, sleek, mobile responsive. Beautiful galleries."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [React 19](https://react.dev/) — UI library

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a configured bucket

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd sports-car-gallery

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Photos
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: photos } = await cosmic.objects
  .find({ type: 'photos' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Collection with Linked Photos
```typescript
const { object: collection } = await cosmic.objects
  .findOne({ type: 'collections', slug: 'my-collection' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(2)
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

| Object Type | Description |
|-------------|-------------|
| `photos` | Individual car photos with description, image, camera, location |
| `collections` | Grouped photo galleries with cover image and linked photos |
| `about` | Photographer profile with tagline, bio, and portrait |
| `testimonials` | Client testimonials with quote, name, company, and avatar |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect the repository in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables in the Netlify dashboard

<!-- README_END -->