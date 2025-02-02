import React, { useState, useMemo } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import Layout from '@theme/Layout';
import { TAGS, Tag } from '../data/tags';
import { usePluginData } from '@docusaurus/useGlobalData';

// ContentCard 컴포넌트의 props 타입 정의
interface ContentCardProps {
  id: string;          // 문서의 고유 식별자
  title: string;       // 문서 제목
  description: string; // 문서 설명
  path: string;        // 문서 경로
  date: string;        // 작성 날짜
  tags: string[];      // 문서에 할당된 태그 목록
}

/**
 * 개별 문서를 카드 형태로 보여주는 컴포넌트
 * 문서의 제목, 설명, 태그, 날짜를 표시하고 해당 문서로 이동할 수 있는 링크를 제공
 */
const ContentCard: React.FC<ContentCardProps> = ({ title, description, path, date, tags }) => {
  const baseUrl = useBaseUrl(''); // 기본 URL 경로 가져오기
  const docPath = `${baseUrl}docs/${path}`; // 최종 문서 경로 생성

  return (
    <Link to={docPath} className="no-underline">
      <div className="w-full p-4">
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-current">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            {/* 태그 목록 렌더링 */}
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

/**
 * 메인 홈페이지 컴포넌트
 * 문서 목록을 표시하고 태그 기반 필터링 기능을 제공
 */
export default function Home(): JSX.Element {
  // 선택된 태그 상태 관리
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  // Docusaurus 설정 가져오기
  const {siteConfig} = useDocusaurusContext();
  
  // 전체 문서 데이터 가져오기
  const allDocsData = useAllDocsData();

  // 사용 가능한 모든 태그 목록 생성
  const availableTags = useMemo(() => {
    const tagSet = new Set(['all']); // 기본적으로 'all' 태그 포함
    
    // 모든 문서를 순회하면서 사용된 태그 수집
    Object.values(allDocsData).forEach(({versions}) => {
      versions.forEach(({docs}) => {
        docs.forEach((doc: any) => {
          console.log('addtag', doc)
          const docTags = doc.metadata?.frontMatter?.tags || [];
          docTags.forEach(tag => tagSet.add(tag));
        });
      });
    });
    
    console.log('Available Tags:', Array.from(tagSet));
    return Array.from(tagSet);
  }, [allDocsData]);

  // 전체 문서 목록 생성 및 가공
  const docs = useMemo(() => {
    const allDocs: ContentCardProps[] = [];
    
    // 모든 문서 데이터를 순회하면서 필요한 정보 추출
    Object.values(allDocsData).forEach(({versions}) => {
      versions.forEach(({docs}) => {
        docs.forEach((doc: any) => {
          console.log('Raw doc data:', JSON.stringify(doc, null, 2));
          
          // frontMatter에서 문서 메타데이터 추출
          const metadata = doc.frontMatter || {};
          const title = doc.title || metadata.title || 'Untitled';
          const description = metadata.description || doc.description || 'No description available';
          const tags = metadata.tags || [];
          const date = metadata.date || new Date().toISOString().split('T')[0];
          
          // 문서 정보 객체 생성 및 추가
          allDocs.push({
            id: doc.id,
            title,
            description,
            path: doc.id,
            tags,
            date,
          });
        });
      });
    });
    
    // 최신 날짜순으로 문서 정렬
    return allDocs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allDocsData]);

  // 선택된 태그에 따라 문서 필터링
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
        {/* 태그 필터 버튼 목록 */}
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

        {/* 필터링된 문서 카드 그리드 */}
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