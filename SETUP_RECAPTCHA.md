# reCAPTCHA Setup Instructions

To enable the contact form, you need to set up Google reCAPTCHA v2:

## Steps:

1. Go to https://www.google.com/recaptcha/admin/create
2. Register a new site with these settings:
   - **Label**: Cashflow Ventures Contact Form
   - **reCAPTCHA type**: reCAPTCHA v2 → "I'm not a robot" Checkbox
   - **Domains**: 
     - localhost (for development)
     - your-production-domain.com (for production)
3. Click "Submit"
4. Copy the **Site Key**
5. Open `.env.local` file in the project root
6. Replace `your_recaptcha_site_key_here` with your actual Site Key:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key_here
   ```
7. Restart your development server: `npm run dev`

## Supabase Setup:

The form is already configured to use Supabase with the table structure:
- **Table name**: `form`
- **Columns**:
  - `id` (uuid, primary key, auto-generated)
  - `created_at` (timestamp, auto-generated)
  - `name` (text)
  - `link` (text)
  - `desc` (text)

Make sure your Supabase table has these columns and Row Level Security (RLS) policies allow inserts.

## Testing:

1. Fill out the form
2. Complete the reCAPTCHA
3. Click Submit
4. Check your Supabase dashboard to see the submitted data
