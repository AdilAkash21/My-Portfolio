import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  fallbackBlogPosts,
  fallbackExperience,
  fallbackProjects,
} from '@/data/portfolioFallback';

export function useProjects(theme) {
  const selectedTheme = theme || 'normal';
  return useQuery({
    queryKey: ['projects', selectedTheme],
    initialData: fallbackProjects,
    queryFn: async () => {
      if (!supabase) return fallbackProjects;
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('theme', selectedTheme)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data?.length ? data : fallbackProjects;
    },
  });
}

export function useExperience(theme) {
  const selectedTheme = theme || 'normal';
  return useQuery({
    queryKey: ['experience', selectedTheme],
    initialData: fallbackExperience,
    queryFn: async () => {
      if (!supabase) return fallbackExperience;
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('theme', selectedTheme)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data?.length ? data : fallbackExperience;
    },
  });
}

export function useBlogPosts(theme) {
  const selectedTheme = theme || 'normal';
  return useQuery({
    queryKey: ['blog_posts', selectedTheme],
    initialData: fallbackBlogPosts,
    queryFn: async () => {
      if (!supabase) return fallbackBlogPosts;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('theme', selectedTheme)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data?.length ? data : fallbackBlogPosts;
    },
  });
}
