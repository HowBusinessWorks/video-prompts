-- AI Prompts Database Schema
-- Phase 1: Foundation & Setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tags table (AI models and categories only)
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('model', 'category')),
  color VARCHAR(50) DEFAULT '#6366f1',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create prompts table (main content)
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  prompt_text TEXT NOT NULL,
  thumbnail_url TEXT,
  media_url TEXT,
  media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video')),
  source_name VARCHAR(200),
  source_url TEXT,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  additional_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create prompt_tags junction table (many-to-many)
CREATE TABLE prompt_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(prompt_id, tag_id)
);

-- Create prompt_views table (tracking)
CREATE TABLE prompt_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_prompts_created_at ON prompts(created_at DESC);
CREATE INDEX idx_prompts_view_count ON prompts(view_count DESC);
CREATE INDEX idx_prompts_media_type ON prompts(media_type);
CREATE INDEX idx_prompts_is_featured ON prompts(is_featured);
CREATE INDEX idx_tags_type ON tags(type);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_prompt_tags_prompt_id ON prompt_tags(prompt_id);
CREATE INDEX idx_prompt_tags_tag_id ON prompt_tags(tag_id);
CREATE INDEX idx_prompt_views_prompt_id ON prompt_views(prompt_id);
CREATE INDEX idx_prompt_views_viewed_at ON prompt_views(viewed_at DESC);

-- Create full-text search index on prompts
CREATE INDEX idx_prompts_search ON prompts
USING gin(to_tsvector('english', title || ' ' || prompt_text));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at
  BEFORE UPDATE ON tags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_prompt_view_count(
  prompt_uuid UUID,
  session_uuid VARCHAR(255)
)
RETURNS VOID AS $$
BEGIN
  -- Check if this session has viewed this prompt in the last hour
  IF NOT EXISTS (
    SELECT 1 FROM prompt_views
    WHERE prompt_id = prompt_uuid
    AND session_id = session_uuid
    AND viewed_at > NOW() - INTERVAL '1 hour'
  ) THEN
    -- Insert view record
    INSERT INTO prompt_views (prompt_id, session_id)
    VALUES (prompt_uuid, session_uuid);

    -- Increment view count
    UPDATE prompts
    SET view_count = view_count + 1
    WHERE id = prompt_uuid;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_views ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to prompts"
  ON prompts FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to tags"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to prompt_tags"
  ON prompt_tags FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to prompt_views"
  ON prompt_views FOR INSERT
  WITH CHECK (true);

-- Insert sample tags (AI models - Image)
INSERT INTO tags (name, slug, type, color) VALUES
  ('Midjourney', 'midjourney', 'model', '#FF6B9D'),
  ('DALL-E 3', 'dall-e-3', 'model', '#10A37F'),
  ('Stable Diffusion', 'stable-diffusion', 'model', '#9333EA'),
  ('Leonardo AI', 'leonardo-ai', 'model', '#F59E0B'),
  ('Firefly', 'firefly', 'model', '#DC2626'),
  ('Flux', 'flux', 'model', '#8B5CF6'),
  ('Ideogram', 'ideogram', 'model', '#EC4899');

-- Insert sample tags (AI models - Video)
INSERT INTO tags (name, slug, type, color) VALUES
  ('Sora', 'sora', 'model', '#10A37F'),
  ('Veo', 'veo', 'model', '#4285F4'),
  ('Runway', 'runway', 'model', '#000000'),
  ('Pika', 'pika', 'model', '#FFD700'),
  ('Kling', 'kling', 'model', '#FF4500'),
  ('Luma', 'luma', 'model', '#00CED1');

-- Insert sample tags (categories)
INSERT INTO tags (name, slug, type, color) VALUES
  ('Portrait', 'portrait', 'category', '#3B82F6'),
  ('Landscape', 'landscape', 'category', '#10B981'),
  ('Abstract', 'abstract', 'category', '#8B5CF6'),
  ('Product', 'product', 'category', '#F59E0B'),
  ('Character', 'character', 'category', '#EC4899'),
  ('Architecture', 'architecture', 'category', '#6366F1'),
  ('Food', 'food', 'category', '#EF4444'),
  ('Nature', 'nature', 'category', '#059669'),
  ('Urban', 'urban', 'category', '#64748B'),
  ('Fantasy', 'fantasy', 'category', '#A855F7');
