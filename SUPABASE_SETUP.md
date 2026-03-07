# Supabase Setup Instructions

## 1. Get Your Supabase Credentials

1. Go to your Supabase project: https://app.supabase.com
2. Click on your project
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (a long JWT token starting with `eyJ...`)

## 2. Update Environment Variables

Open `.env.local` and replace the placeholders:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc4ODg4ODg4LCJleHAiOjE5OTQ0NjQ4ODh9.your-signature-here
```

## 3. Create the Database Table

In your Supabase project:

1. Go to **SQL Editor**
2. Run this SQL:

```sql
-- Create the form table
CREATE TABLE form (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  link TEXT NOT NULL,
  desc TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE form ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON form
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reading (optional - for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON form
  FOR SELECT
  TO authenticated
  USING (true);
```

## 4. Restart Your Dev Server

```bash
npm run dev
```

## 5. Test the Form

1. Fill out the contact form
2. Complete reCAPTCHA (invisible)
3. Click Submit
4. Check your Supabase dashboard → **Table Editor** → **form** to see the submission

## Troubleshooting

- **"Failed to fetch"**: Check that your Supabase URL and anon key are correct
- **"Row Level Security"**: Make sure the insert policy is created
- **"Invalid key"**: The anon key should be a long JWT token, not a short string
