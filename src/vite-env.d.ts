/// <reference types="vite/client" />

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  github?: string;
  theme: 'normal' | 'batman';
  icon_type?: string;
}

interface Experience {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  details: string[];
  icon_type: string;
  type: 'education' | 'work';
  theme: 'normal' | 'batman';
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
  tags: string[];
  theme: 'normal' | 'batman';
}
