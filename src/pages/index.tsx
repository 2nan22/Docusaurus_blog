import React, { useState, useMemo } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import Layout from '@theme/Layout';
import { TAGS, Tag } from '../data/tags';

// 문서 타입 정의
interface DocDataType {
  id: string;
  title: string;
  description: string;
  frontMatter?: {
    tags?: string[];
    date?: string;
  };
}

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  path: string;
  date: string;
  tags: string[];
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, path, date, tags }) => {
  const baseUrl = useBaseUrl('');
  const docPath = `${baseUrl}docs/${path}`;

  return (
    <Link to={docPath} className="no-underline">
      <div className="w-full p-4">
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-current">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map(tagId => (
                <span 
                  key={tagId}
                  className={`px-2 py-1 rounded-full text-white text-sm ${TAGS[tagId]?.color || 'bg-gray-500'}`}
                >
                  {TAGS[tagId]?.label || tagId}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Home(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const {siteConfig} = useDocusaurusContext();
  const allDocsData = useAllDocsData();

  const availableTags = useMemo(() => {
    const tagSet = new Set(['all']);
    
    Object.values(allDocsData).forEach(({versions}) => {
      versions.forEach(({docs}) => {
        docs.forEach((doc: any) => {
          const docTags = doc.metadata?.frontMatter?.tags || [];
          docTags.forEach(tag => tagSet.add(tag));
        });
      });
    });
    
    console.log('Available Tags:', Array.from(tagSet));
    return Array.from(tagSet);
  }, [allDocsData]);

  const docs = useMemo(() => {
    const allDocs: ContentCardProps[] = [];
    
    console.log('AllDocsData:', allDocsData); // 데이터 구조 확인용
    
    Object.values(allDocsData).forEach(({versions}) => {
      versions.forEach(({docs}) => {
        docs.forEach((doc: any) => {
          console.log('Doc metadata:', doc.metadata); // 메타데이터 확인용
          
          // 문서의 메타데이터에서 정보 추출
          const metadata = doc.metadata || {};
          
          allDocs.push({
            id: metadata.id || doc.id,
            title: metadata.title || 'Untitled',
            description: metadata.description || 'No description available.',
            path: metadata.id || doc.id,
            tags: metadata.tags || [],
            date: metadata.date || new Date().toLocaleDateString(),
          });
        });
      });
    });
    
    return allDocs;
  }, [allDocsData]);

  // Filter docs based on selected tag
  const filteredDocs = useMemo(() => {
    if (selectedTag === 'all') {
      return docs;
    }
    return docs.filter(doc => doc.tags.includes(selectedTag));
  }, [docs, selectedTag]);

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <main className="container mx-auto px-4 py-8">
        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {availableTags.map(tagId => (
            <button
              key={tagId}
              onClick={() => setSelectedTag(tagId)}
              className={`px-4 py-2 rounded-full text-white 
                ${tagId === 'all' ? 'bg-emerald-500' : TAGS[tagId]?.color || 'bg-gray-500'}
                ${selectedTag === tagId ? 'ring-2 ring-offset-2 ring-emerald-500' : ''}`}
            >
              {tagId === 'all' ? '전체' : TAGS[tagId]?.label || tagId}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <ContentCard
              key={doc.id}
              {...doc}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
}