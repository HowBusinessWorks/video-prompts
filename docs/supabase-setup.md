# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create account
3. Click "New Project"
4. Fill in details:
   - **Project Name**: AI Prompts Gallery (or your choice)
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development

5. Wait 2-3 minutes for project to initialize

## Step 2: Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `/supabase/migrations/001_initial_schema.sql`
4. Paste into SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. Verify success message appears

### What This Creates:
- ✅ 4 tables: `prompts`, `tags`, `prompt_tags`, `prompt_views`
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ View tracking function
- ✅ Sample AI models and categories

## Step 3: Set Up Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **New Bucket**
3. Bucket details:
   - **Name**: `prompt-media`
   - **Public bucket**: ✅ Yes (for public access)
4. Click **Create Bucket**

### Configure Storage Policies:
1. Click on `prompt-media` bucket
2. Go to **Policies** tab
3. Add policy for public read:
   - **Policy Name**: Public read access
   - **Policy Definition**:
     ```sql
     CREATE POLICY "Public read access"
     ON storage.objects FOR SELECT
     USING (bucket_id = 'prompt-media');
     ```

## Step 4: Get API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them for `.env.local`):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)

## Step 5: Configure Environment Variables

1. In your project root, create `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
   ```

2. Add to `.gitignore` (should already be there):
   ```
   .env.local
   ```

## Step 6: Verify Setup

Run this query in **SQL Editor** to verify data:

```sql
-- Check tags were created
SELECT type, COUNT(*) as count
FROM tags
GROUP BY type;

-- Should return:
-- model    | 13
-- category | 10
```

## Step 7: Add Sample Prompt (Optional)

Test the database with a sample prompt:

```sql
-- Insert a sample prompt
INSERT INTO prompts (
  title,
  prompt_text,
  media_type,
  source_name,
  source_url,
  view_count
) VALUES (
  'Cinematic Landscape with Sunset',
  'A breathtaking mountain landscape at golden hour, cinematic lighting, dramatic clouds, photorealistic, 8K quality',
  'image',
  'John Doe',
  'https://example.com/johndoe',
  0
) RETURNING id;

-- Use the returned ID to add tags
-- Replace <prompt-id> with the UUID from above
INSERT INTO prompt_tags (prompt_id, tag_id)
SELECT '<prompt-id>', id
FROM tags
WHERE slug IN ('midjourney', 'landscape');
```

## Troubleshooting

### Migration Fails
- Check for syntax errors
- Ensure you copied the entire file
- Try running sections separately

### Storage Not Working
- Verify bucket is public
- Check storage policies
- Ensure correct bucket name in code

### RLS Blocks Queries
- Verify policies are created
- Check policy definitions in SQL Editor
- Test with `SELECT * FROM prompts` to verify public read

## Next Steps

✅ Database schema created
✅ Storage bucket configured
✅ API credentials obtained

→ Continue to: Configure Next.js project with Supabase client
