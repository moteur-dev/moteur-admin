// src/mocks/projects.ts
import type { ProjectSchema } from '@/types/Project'

export const mockProjects: ProjectSchema[] = [
  { id: 'site1', label: 'My First Project', description: 'Demo project', defaultLocale: 'en' },
  { id: 'docs',  label: 'Documentation Site', description: 'Static content', defaultLocale: 'en' },
  { id: 'blog',  label: 'Blog Revamp', description: 'New headless setup', defaultLocale: 'en' },
]