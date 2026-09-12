import { useQuery } from '@tanstack/react-query';
import { isSupabaseConfigured, supabase } from '@/integrations/supabase/client';

export function useProjects(theme) {
  return useQuery({
    queryKey: ['projects', theme],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('theme', 'normal')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useExperience(theme) {
  return useQuery({
    queryKey: ['experience', theme],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('theme', 'normal')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useBlogPosts(theme) {
  return useQuery({
    queryKey: ['blog_posts', theme],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('theme', 'normal')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}
