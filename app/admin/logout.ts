import { createClient } from '@/lib/supabase/client';

export default async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Couldn't log out");
  }
}
