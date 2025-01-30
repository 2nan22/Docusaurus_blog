// src/data/tags.ts
export interface Tag {
    id: string;
    label: string;
    color: string;
    description?: string;
  }
  
  export const TAGS: { [key: string]: Tag } = {
    all: {
      id: 'all',
      label: '전체',
      color: 'bg-emerald-500'
    },
    project: {
      id: 'project',
      label: '프로젝트',
      color: 'bg-blue-500'
    },
    docusaurus: {
      id: 'docusaurus',
      label: 'Docusaurus',
      color: 'bg-purple-500'
    }
    // ... 기타 태그들
  };