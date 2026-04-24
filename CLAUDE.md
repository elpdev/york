# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Initial setup
./bin/setup

# Start development server (Rails + Tailwind CSS watch)
./bin/dev

# Database operations
bin/rails db:prepare      # Create and migrate database
bin/rails db:migrate      # Run pending migrations
bin/rails db:seed         # Load seed data
bin/rails db:reset        # Drop, recreate, and seed database

# Asset compilation
bin/rails tailwindcss:watch # Build and watch Tailwind CSS styles

# Background jobs
bin/rails solid_queue:start  # Start job processor

# Code quality
bundle exec standardrb       # Run Ruby linter
bundle exec standardrb --fix # Auto-fix linting issues
bundle exec brakeman        # Security scan
```

## Architecture Overview

This is a Rails 8.0.2 application for an artist portfolio website with the following key architectural decisions:

### Authentication & Authorization

- Custom session-based authentication using `bcrypt` (no Devise)
- `Authentication` concern in `app/controllers/concerns/authentication.rb`
- Admin users identified by `admin` boolean flag on User model
- Sessions stored in database via `sessions` table

### Frontend Stack

- **Hotwire**: Turbo + Stimulus for SPA-like behavior without complex JavaScript
- **Tailwind CSS 4.x**: Utility-first CSS framework (note: some components migrated to vanilla CSS)
- **ViewComponent**: Component-based UI architecture in `app/components/`
- **Import Maps**: No Node.js build step required for JavaScript

### Admin Interface

- **Madmin gem**: Provides admin dashboard at `/admin`
- Admin resources defined in `app/madmin/resources/`
- Custom admin views in `app/views/madmin/`

### File Storage

- **Active Storage** with Linode Object Storage (S3-compatible)
- Configuration in `config/storage.yml`
- Images attached to `Art` and `HomePage` models

### Background Processing

- **Solid Queue**: Database-backed job queue (part of Rails 8 solid stack)
- **Solid Cache**: Database-backed caching
- **Solid Cable**: Database-backed WebSocket connections

### Key Models & Features

- **User**: Authentication with sessions
- **Art**: Portfolio pieces with image attachments
- **Contact**: Contact form submissions
- **HomePage**: Dynamic home page content with carousel images

### Custom Components

- **Carousel**: Custom Stimulus controller with vanilla CSS (recently refactored from Tailwind)
- **Footer**: ViewComponent implementation
- **Pagination**: Pagy gem for efficient pagination

### Development Notes

- Tests are minimal - test framework is disabled in `config/application.rb`
- Uses SQLite for all environments (production uses multiple SQLite databases)
- Deployment configured with Kamal for containerization
- HTTP acceleration via Thruster gem

## Important Patterns

1. **ViewComponents**: Reusable UI components should go in `app/components/`
2. **Stimulus Controllers**: JavaScript behavior in `app/javascript/controllers/`
3. **Madmin Resources**: Admin interface configurations in `app/madmin/resources/`
4. **Authentication**: Always include `Authentication` concern in controllers needing auth
5. **File Uploads**: Use Active Storage for all file attachments

