# Requirements - AI Prompts Gallery

## Manager Specifications

### Filter Options
- **Image/Video**: Toggle between media types
- **Model**: AI platforms (Veo, Sora, Midjourney, DALL-E, etc.)
- **Category**: Content categories (Portrait, Landscape, Abstract, etc.)
- **Sort**: Recent / Most Viewed

### Card Display Parameters
Each prompt card must show:
- **Prompt**: The AI generation prompt text
- **Image/Video**: Preview of generated media
- **Model**: AI platform used (e.g., Sora, Veo, Midjourney)
- **Categories**: Content type tags
- **Source Name**: Original creator's name
- **Source Link**: Link to creator's profile/page

---

## Database Schema Alignment

### Filters Map To:
1. **Image/Video** → `prompts.media_type` column
2. **Model** → `tags` table where `type = 'model'`
3. **Category** → `tags` table where `type = 'category'`
4. **Sort** → `prompts.created_at` (Recent) or `prompts.view_count` (Most Viewed)

### Card Data Maps To:
1. **Prompt** → `prompts.prompt_text`
2. **Image/Video** → `prompts.thumbnail_url` (card) / `prompts.media_url` (modal)
3. **Model** → `tags.name` (via `prompt_tags` where `tags.type = 'model'`)
4. **Categories** → `tags.name` (via `prompt_tags` where `tags.type = 'category'`)
5. **Source Name** → `prompts.source_name`
6. **Source Link** → `prompts.source_url`

---

## AI Models Included

### Image Generation Models
- Midjourney
- DALL-E 3
- Stable Diffusion
- Leonardo AI
- Firefly
- Flux
- Ideogram

### Video Generation Models
- **Sora** (OpenAI)
- **Veo** (Google)
- Runway
- Pika
- Kling
- Luma

---

## Categories
- Portrait
- Landscape
- Abstract
- Product
- Character
- Architecture
- Food
- Nature
- Urban
- Fantasy

---

## User Flow

1. **Landing Page**:
   - Grid of prompt cards
   - Filter panel (Image/Video, Model, Category)
   - Sort dropdown (Recent/Most Viewed)

2. **Card Interaction**:
   - Click card → Modal opens
   - View full prompt, media, tags, source
   - Click source link → External link
   - Modal increments view count

3. **Filtering**:
   - Select media type → Filter results
   - Select model → Filter by AI platform
   - Select category → Filter by content type
   - Multiple filters combine (AND logic)

4. **Sorting**:
   - Recent → Sort by `created_at DESC`
   - Most Viewed → Sort by `view_count DESC`
