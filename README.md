# Cyrus Khiabani - Portfolio Website

A modern, nature-inspired portfolio website built with React 19, TypeScript, TanStack Router, and Tailwind CSS.

## Features

- **Modern Stack**: React 19, TypeScript, TanStack Router, TanStack Query, Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful interactions
- **Type-Safe**: Full TypeScript with Zod validation
- **AI Integration**: Showcases MCP server development and AI automation projects
- **Health Tech Focus**: Specialized portfolio for health tech integrations
- **Contact Form**: Validated form with Vercel serverless function
- **Nature Theme**: Forest greens, mountain blues, earth tones

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Form & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Build & Dev Tools
- **Vite** - Build tool
- **pnpm** - Package manager
- **TanStack DevTools** - Development tools

### Deployment
- **Vercel** - Hosting & serverless functions

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The site will be available at `http://localhost:3000`

## Adding Your Content

### 1. Add Profile Photo
- Save your photo to: `public/images/profile/avatar.jpg`
- Recommended size: 800x800px (square)
- Format: JPG or PNG
- Style: Nature background preferred

### 2. Add Project Screenshots
Save screenshots to `public/images/projects/` with these names:
- `tsheets-mcp.png` - TSheets MCP Server
- `diabetes-ai.png` - Diabetes AI Assistant
- `dexcom-mcp.png` - Dexcom MCP Server
- `journalai.png` - JournalAI
- `reelingit.png` - ReelingIt
- `password-gen.png` - Password Generator

Recommended size: 1200x800px (3:2 ratio)

### 3. Update Project Data
Edit `src/data/projects.ts` to customize your projects:
- Update titles, descriptions, tech stacks
- Change GitHub and demo URLs
- Add or remove projects

### 4. Update Skills
Edit `src/data/skills.ts` to add your tech stack:
- Organize by category (Languages, Frontend, Backend, etc.)
- Add or remove skill categories

### 5. Update Contact Info
Edit these files with your information:
- `src/components/sections/Hero.tsx` - Social links
- `src/components/sections/Contact.tsx` - Email and location
- `src/components/layout/Footer.tsx` - Footer links

## Project Structure

```
cyrus-personal-website/
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Hero, About, Projects, Services, Contact
│   │   └── ui/              # Button, Card, SectionHeading
│   ├── data/                # Projects, skills data
│   ├── lib/                 # Utilities, query client
│   ├── routes/              # TanStack Router routes
│   ├── index.css            # Global styles
│   └── main.tsx             # App entry point
├── public/
│   └── images/              # Photos and screenshots
├── api/
│   └── contact.ts           # Vercel serverless function
└── ...config files
```

## Customization

### Colors
The nature-inspired color palette is defined in `tailwind.config.ts`:
- **Forest**: Greens (#2D5016 primary)
- **Mountain**: Blues (#4A7C9C primary)
- **Sunrise**: Oranges (#D97706 primary)
- **Earth**: Neutral browns/grays

### Fonts
Default fonts (defined in `tailwind.config.ts`):
- Sans: Inter, system-ui
- Mono: JetBrains Mono, Fira Code

To use custom fonts, add them via Google Fonts in `index.html`.

### Sections
All sections are in `src/components/sections/`:
- **Hero**: Main landing section
- **About**: Bio, values, skills
- **Projects**: Portfolio showcase
- **Services**: What you offer
- **Contact**: Contact form

Remove or reorder sections in `src/routes/index.tsx`.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
pnpm add -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts to connect your GitHub repo

4. Configure environment variables (if using email service):
```bash
vercel env add SENDGRID_API_KEY
```

### Deploy to Other Platforms

The site is a standard Vite app and can be deployed to:
- Netlify
- Cloudflare Pages
- GitHub Pages
- Any static hosting

Build command: `pnpm build`
Output directory: `dist`

## Contact Form Setup

The contact form uses a Vercel serverless function (`api/contact.ts`).

To enable email sending:

1. Sign up for an email service (SendGrid, Resend, etc.)
2. Get your API key
3. Add to Vercel environment variables
4. Uncomment and configure the email code in `api/contact.ts`

## Development

### Key Commands
- `pnpm dev` - Start dev server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm deploy` - Deploy to Vercel

### DevTools
The app includes TanStack DevTools in development:
- **Router DevTools**: Bottom-right corner
- **Query DevTools**: Bottom-left corner

## License

MIT License - see LICENSE file for details

## Author

**Cyrus Khiabani**
Full-Stack Developer & AI Specialist
[GitHub](https://github.com/cyrusae) | [LinkedIn](https://linkedin.com/in/cyruskhiabani)
