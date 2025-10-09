-- Sample Prompts for Testing
-- Run this AFTER running 001_initial_schema.sql

-- Insert sample image prompts
INSERT INTO prompts (title, prompt_text, media_type, source_name, source_url, view_count, thumbnail_url, media_url) VALUES
(
  'Cinematic Mountain Sunset',
  'A breathtaking mountain landscape at golden hour, cinematic lighting, dramatic clouds, photorealistic, 8K quality, professional color grading, wide angle lens, epic vista',
  'image',
  'Alex Chen',
  'https://twitter.com/alexchen',
  1234,
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
),
(
  'Abstract Digital Art',
  'Abstract digital art with flowing colors, iridescent liquids, particles floating, dreamy atmosphere, 4K resolution, ethereal glow, smooth gradients',
  'image',
  'Mike Johnson',
  'https://twitter.com/mikej',
  892,
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&h=1080&fit=crop'
),
(
  'Product Photography Setup',
  'Professional product photography, minimalist white background, studio lighting, dramatic shadows, commercial style, soft focus, high-end aesthetic',
  'image',
  'Emma Wilson',
  'https://twitter.com/emmaw',
  1567,
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&h=1080&fit=crop'
),
(
  'Fantasy Character Portrait',
  'Epic fantasy character portrait, elven warrior, magical aura, detailed armor, Lord of the Rings style, concept art, dramatic lighting, intricate details',
  'image',
  'David Lee',
  'https://twitter.com/davidlee',
  3421,
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&h=1080&fit=crop'
),
(
  'Modern Architecture',
  'Modern minimalist architecture, glass and concrete, dramatic angles, golden hour lighting, architectural photography, sharp lines, geometric composition',
  'image',
  'Lisa Park',
  'https://twitter.com/lisapark',
  987,
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1920&h=1080&fit=crop'
),
(
  'Gourmet Food Photography',
  'Professional food photography, gourmet plating, natural lighting, shallow depth of field, rustic wooden table, appetizing presentation, warm tones',
  'image',
  'Julia Martinez',
  'https://twitter.com/juliam',
  1745,
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop'
);

-- Insert sample video prompts
INSERT INTO prompts (title, prompt_text, media_type, source_name, source_url, view_count, thumbnail_url, media_url) VALUES
(
  'Cyberpunk City Night',
  'Futuristic cyberpunk cityscape at night, neon lights, rain-soaked streets, flying cars, blade runner style, ultra detailed, cinematic camera movement',
  'video',
  'Sarah Kim',
  'https://twitter.com/sarahkim',
  2891,
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop'
),
(
  'Ocean Wave Cinematic',
  'Cinematic ocean wave shot, slow motion, turquoise water, perfect barrel, underwater perspective, 4K video, smooth camera movement, natural lighting',
  'video',
  'Tom Anderson',
  'https://twitter.com/tomanderson',
  2104,
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop'
);

-- Now let's link prompts to tags
-- First, we need to get the IDs of our prompts and tags

-- Link "Cinematic Mountain Sunset" to tags
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT
  p.id,
  t.id
FROM prompts p
CROSS JOIN tags t
WHERE p.title = 'Cinematic Mountain Sunset'
  AND t.slug IN ('midjourney', 'landscape', 'nature');

-- Link "Abstract Digital Art" to tags
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT
  p.id,
  t.id
FROM prompts p
CROSS JOIN tags t
WHERE p.title = 'Abstract Digital Art'
  AND t.slug IN ('dall-e-3', 'abstract', 'fantasy');

-- Link "Product Photography Setup" to tags
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT
  p.id,
  t.id
FROM prompts p
CROSS JOIN tags t
WHERE p.title = 'Product Photography Setup'
  AND t.slug IN ('midjourney', 'product');

-- Link "Fantasy Character Portrait" to tags
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT
  p.id,
  t.id
FROM prompts p
CROSS JOIN tags t
WHERE p.title = 'Fantasy Character Portrait'
  AND t.slug IN ('stable-diffusion', 'character', 'fantasy');

-- Link "Modern Architecture" to tags
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT
  p.id,
  t.id
FROM prompts p
CROSS JOIN tags t
WHERE p.title = 'Modern Architecture'
  AND t.slug IN ('midjourney', 'architecture');

-- Link "Gourmet Food Photography" to tags
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT
  p.id,
  t.id
FROM prompts p
CROSS JOIN tags t
WHERE p.title = 'Gourmet Food Photography'
  AND t.slug IN ('dall-e-3', 'food');

-- Link "Cyberpunk City Night" to tags (VIDEO)
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT
  p.id,
  t.id
FROM prompts p
CROSS JOIN tags t
WHERE p.title = 'Cyberpunk City Night'
  AND t.slug IN ('sora', 'urban', 'fantasy');

-- Link "Ocean Wave Cinematic" to tags (VIDEO)
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT
  p.id,
  t.id
FROM prompts p
CROSS JOIN tags t
WHERE p.title = 'Ocean Wave Cinematic'
  AND t.slug IN ('veo', 'nature');

-- Verify the data
SELECT
  p.title,
  p.media_type,
  p.view_count,
  COUNT(pt.tag_id) as tag_count
FROM prompts p
LEFT JOIN prompt_tags pt ON p.id = pt.id
GROUP BY p.id, p.title, p.media_type, p.view_count
ORDER BY p.created_at DESC;
