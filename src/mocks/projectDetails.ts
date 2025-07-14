// src/mocks/projectDetail.ts
import type { ProjectDetails } from '@/types/Project'
/*import type { Entry } from '@/types/Entry'
import type { LayoutItem } from '@/types/Layout'*/

export const mockProjectDetail: ProjectDetails & {
  entries: any,
  layouts: any
} = {
  id: 'site1',
  label: 'My First Project',
  description: 'Demo project for mocking',
  meta: {
    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },
  

  defaultLocale: 'en',

  // mock entries
  entries: [
    { id: 'e1', title: 'Homepage content' },
    { id: 'e2', title: 'Blog post index' },
    { id: 'e3', title: 'Contact form' },
  ],

  // mock layouts
  layouts: [
    { id: 'l1', name: 'Landing Page' },
    { id: 'l2', name: 'Article Page' },
  ],
}
