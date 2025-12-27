# Isabelle Cinquin - Website

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload-3.69-blue?logo=payload)](https://payloadcms.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.2-fbf0df?logo=bun)](https://bun.sh/)

Professional website for **Isabelle Cinquin**, certified childminder in Sciez (74), near Thonon-les-Bains and Lake Geneva, France.

## ✨ Features

- 🎨 **Modern Design** - Elegant interface with Framer Motion animations
- 📝 **Headless CMS** - Full admin panel with Payload CMS
- 📱 **Responsive** - Optimized for mobile, tablet and desktop
- 🖼️ **Live Preview** - Real-time preview of content changes
- 📧 **Contact Form** - Email sending via Resend
- 🤖 **AI-powered** - Description generation with Google Gemini
- 🗄️ **S3 Storage** - Media hosted on Cloudflare R2
- 🚀 **Coolify Deployment** - Ready-to-use Nixpacks configuration

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **CMS** | Payload CMS 3.69 |
| **Database** | PostgreSQL |
| **Storage** | Cloudflare R2 (S3-compatible) |
| **Email** | Resend |
| **AI** | Google Gemini (AI SDK) |
| **Deployment** | Coolify (Nixpacks) |

## 📦 Installation

### Prerequisites

- [Bun](https://bun.sh/) >= 1.2
- [Node.js](https://nodejs.org/) >= 22.21.0
- PostgreSQL

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/CinquinAndy/IsabelleCinquin.git
   cd IsabelleCinquin
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Then edit the variables in `.env`:

   ```env
   DATABASE_URI=postgres://user:password@localhost:5432/database
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   PAYLOAD_SECRET=your-secret-key
   
   # S3 / Cloudflare R2
   S3_BUCKET=your-bucket
   S3_ACCESS_KEY_ID=your-access-key
   S3_SECRET_ACCESS_KEY=your-secret-key
   S3_ENDPOINT=https://your-endpoint.r2.cloudflarestorage.com
   S3_REGION=auto
   
   # Services
   RESEND_TOKEN=re_xxxx
   GEMINI_API_KEY=your-gemini-key
   REVALIDATE_SECRET=your-revalidation-secret
   ```

4. **Start the development server**

   ```bash
   bun dev
   ```

5. **Access the application**
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## 🚀 Deployment

### Coolify (Nixpacks)

The project includes a `nixpacks.toml` file configured for Bun:

```toml
[phases.setup]
nixPkgs = ["...", "bun"]

[phases.install]
cmds = ["bun install --frozen-lockfile"]

[phases.build]
cmds = ["bun run build"]

[start]
cmd = "bun run start"
```

### Required Environment Variables

Configure these variables in Coolify:

| Variable | Description |
|----------|-------------|
| `DATABASE_URI` | PostgreSQL connection URL |
| `NEXT_PUBLIC_SERVER_URL` | Public website URL |
| `PAYLOAD_SECRET` | Payload secret key (min 32 chars) |
| `S3_*` | S3/R2 storage configuration |
| `RESEND_TOKEN` | Resend API token |
| `GEMINI_API_KEY` | Google Gemini API key |
| `REVALIDATE_SECRET` | ISR revalidation secret |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── (frontend)/         # Public pages
│   └── (payload)/          # Payload admin routes
├── collections/            # Payload CMS collections
│   ├── Categories.ts
│   ├── Media.ts
│   ├── Posts.ts
│   └── Users.ts
├── components/             # React components
│   ├── header/             # Navigation
│   ├── hero/               # Hero section
│   ├── sections/           # Page sections
│   ├── payload/            # Payload components
│   └── ui/                 # Reusable UI components
├── globals/                # Payload CMS globals
│   └── Landing.ts          # Homepage configuration
├── lib/                    # Utilities
└── payload.config.ts       # Payload configuration
```

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Development server |
| `bun build` | Production build |
| `bun start` | Start in production |
| `bun check` | Biome check (lint + format) |
| `bun lint` | Lint only |
| `bun format` | Format code |
| `bun payload generate:types` | Generate TypeScript types |

## 📄 License

MIT © [Andy Cinquin](https://music-music.music)

---

<div align="center">
  <sub>Built with ❤️ for Isabelle Cinquin</sub>
</div>
