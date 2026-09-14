import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  fallbackBlogPosts,
  fallbackExperience,
  fallbackProjects,
} from '@/data/portfolioFallback';

const normalizeProject = (project) => {
  if (
    project.title !== 'C.W.N.U Website Design' &&
    project.title !== 'Portfolio Experience' &&
    project.title !== 'Weather Insights' &&
    project.title !== 'Personal_Finance_Tracker'
  ) {
    return project;
  }

  return {
    ...project,
    category: ['Web', 'Design'],
    ...(project.title === 'C.W.N.U Website Design'
      ? {
          title: 'C.W.N.U_website_Design',
          github: 'https://github.com/AdilAkash21/C.W.N.U-website-Design',
        }
      : project.title === 'Portfolio Experience'
        ? { github: 'https://github.com/AdilAkash21/My-Portfolio' }
        : project.title === 'Weather Insights'
          ? {
            title: 'Fitness_Tracker',
            description: 'A practical fitness tracking application for monitoring daily activity, tracking progress, and supporting healthier routines.',
            category: 'App',
            tags: ['React', 'Health Tracking', 'Responsive'],
            github: 'https://github.com/AdilAkash21/Fitness-Tracker',
          }
          : {
              category: ['App', 'Design'],
              github: 'https://github.com/AdilAkash21/Personal_Finance_Tracker',
            }),
  };
};

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
      return data?.length ? data.map(normalizeProject) : fallbackProjects;
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
