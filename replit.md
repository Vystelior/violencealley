# Violence Alley

## Overview

Violence Alley is a retro Adult Swim streaming archive application with a cyberpunk/VHS aesthetic. The application allows users to browse and stream Adult Swim shows with metadata fetched from The Movie Database (TMDB) API. The project features a retro-styled interface with neon effects and scanline overlays to evoke a nostalgic VHS viewing experience.

**Recent Changes (November 2025)**:
- Migrated from Vercel serverless deployment to Replit environment
- Unified styling system with shared CSS file for consistency
- Enhanced request form with better UX and cyberpunk styling
- Changed color scheme from pink to red (#DC143C) for violence-themed aesthetic
- Fixed Xavier Renegade Angel season 2 thumbnail display by using show poster fallback

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: Static HTML/CSS/JavaScript with Tailwind CSS for styling

**Design Pattern**: Multi-page application (MPA) with client-side JavaScript for dynamic content

The frontend consists of three main pages:
- `index.html` - Main landing page for browsing shows
- `series.html` - Individual series viewing page with video player
- `request.html` - User request submission form

**Styling Approach**: Universal CSS file (`public/css/style.css`) provides consistent modern dark theme across all pages with:
- Violence-themed crimson red accents (#DC143C primary, #B10026 hover)
- Dark gradient backgrounds (#0F1115 to #283544)
- Interactive card hover effects with red borders
- Form elements with red borders and focus rings
- Modern sans-serif font family throughout
- Smooth transitions and hover effects on buttons and links

**Thumbnail Fallback Logic**: Episode cards in `series.html` use a robust fallback system:
- Primary: Episode still image from TMDB (`still_path`)
- Fallback: Show poster when episode still is unavailable
- Final fallback: Placeholder image
- This ensures Xavier Renegade Angel season 2 and other shows with missing episode stills display properly

**Problem Addressed**: Creating an immersive retro viewing experience that matches Adult Swim's distinctive aesthetic while maintaining code consistency

**Rationale**: Universal CSS file eliminates code duplication across pages while Tailwind CSS provides responsive utility classes. This hybrid approach balances maintainability with creative control.

### Backend Architecture

**Technology Stack**: Node.js with Express.js framework

**Design Pattern**: Simple API proxy server

The backend serves two primary functions:
1. Static file serving for the `/public` directory
2. TMDB API proxy endpoint at `/api/tmdb`

**Migration Note**: The application was migrated from Vercel to Replit in November 2025. The original Vercel serverless function (`api/tmdb.js`) was converted to an Express endpoint in `server.js`. Legacy Vercel files remain in the repository for reference.

**Problem Addressed**: Need to proxy TMDB API requests to hide API keys from client-side code and avoid CORS issues

**Chosen Solution**: Express.js middleware-based proxy that forwards requests to TMDB with server-side API key injection

**Security Features**:
- HTTP method restriction (GET only)
- API key stored in environment variables (Replit Secrets)
- Cache-Control headers disabled for Replit iframe environment
- Error handling for missing API keys and failed TMDB requests
- Server binds to 0.0.0.0:5000 for Replit compatibility

**Alternatives Considered**: Direct client-side TMDB calls (rejected due to API key exposure)

### Data Management

**Show Catalog**: Maintained in `public/js/shows.js` as a static JavaScript array

**Structure**: Each show entry contains:
- `tmdb`: TMDB series ID (integer)
- `imdb`: IMDb identifier (string)

**Current Shows**:
- Mr Pickles (TMDB: 61593)
- Xavier: Renegade Angel (TMDB: 14769)

**Problem Addressed**: Need for a simple, maintainable show catalog without database overhead

**Rationale**: For a small catalog of Adult Swim shows, a static JavaScript file provides sufficient functionality with zero infrastructure requirements

**Scalability Consideration**: This approach works well for small to medium catalogs (dozens to hundreds of shows). For larger catalogs or user-generated content, migration to a database would be recommended.

### API Integration

**TMDB API Proxy Endpoint**: `/api/tmdb`

**Supported Query Parameters**:
- `type`: Either "tv" or "season"
- `id`: TMDB series identifier
- `season`: Season number (required when type="season")

**API Request Flow**:
1. Client requests show metadata via `/api/tmdb?type=tv&id=61593`
2. Server validates request method and parameters
3. Server constructs TMDB API URL with secret API key
4. Server forwards request to TMDB and returns response to client

**Error Handling**:
- 405 for non-GET requests
- 400 for invalid type parameter
- 500 for missing API key configuration
- Passthrough of TMDB HTTP status codes (e.g., 404 for not found)

## External Dependencies

### Third-Party APIs

**The Movie Database (TMDB) API**
- **Purpose**: Fetching show metadata, episode information, and artwork
- **Authentication**: API key stored in `TMDB_API_KEY` environment variable
- **Endpoints Used**:
  - `GET /3/tv/{id}` - Retrieve TV show details
  - `GET /3/tv/{id}/season/{season}` - Retrieve season details
- **Rate Limiting**: Standard TMDB rate limits apply (40 requests per 10 seconds)

### NPM Packages

**express (^4.18.2)**
- **Purpose**: Web server framework for routing and middleware
- **Key Features Used**: Static file serving, API routing, middleware

### CDN Resources

**Tailwind CSS (3.3.3)**
- **Purpose**: Utility-first CSS framework
- **Delivery**: Loaded via jsdelivr CDN
- **Usage**: Applied throughout all HTML pages for responsive styling

### Runtime Requirements

**Node.js**: Version >=18.0.0 specified in package.json
- **Rationale**: Ensures native fetch API support without polyfills

### Environment Variables

**Required Configuration**:
- `TMDB_API_KEY` - API key for The Movie Database authentication

**Server Configuration**:
- Default PORT: 5000 (hardcoded in server.js)