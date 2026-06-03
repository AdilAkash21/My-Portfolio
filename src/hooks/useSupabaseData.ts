import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useProjects(theme) {
  return useQuery({
    queryKey: ['projects', theme],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('theme', theme === 'batman' ? 'batman' : 'normal');
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
        .order('created_at', { ascending: false });
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
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}
