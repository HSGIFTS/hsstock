import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ujvlrrluczfuizzqzkcg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqdmxycmx1Y3pmdWl6enF6a2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzU2NTMsImV4cCI6MjA5NDc1MTY1M30.VR1B2l99uv5q2Fr553O7tJUf2Ewtrny-eIL6vIywARQ'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)