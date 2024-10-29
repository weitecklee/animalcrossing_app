import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import EditVillager from './editVillager';

export default async function AdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/admin/login');
  }

  return (
    <>
      <EditVillager />
    </>
  );
}
