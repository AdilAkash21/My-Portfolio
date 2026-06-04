import { useQuery } from '@tanstack/react-query';
import { supabase as _supabase } from '@/integrations/supabase/client';
const supabase: any = _supabase;

export function useProjects(theme) {
  return useQuery({
    queryKey: ['projects', theme],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('theme', theme === 'batman' ? 'batman' : 'normal')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useExperience(theme) {
  return useQuery({
    queryKey: ['experience', theme],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('theme', theme === 'batman' ? 'batman' : 'normal')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useBlogPosts(theme) {
  return useQuery({
    queryKey: ['blog_posts', theme],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('theme', theme === 'batman' ? 'batman' : 'normal')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}
