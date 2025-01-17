// src/components/BlogActivityHeatmap/index.tsx
import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import type { BlogPost } from '@docusaurus/plugin-content-blog';

const BlogActivityHeatmap: React.FC = () => {
  // 수정된 데이터 가져오기 방식
  const blogData = usePluginData('docusaurus-plugin-content-blog', 'default') as {
    blogPosts: BlogPost[];
  };

  // 데이터가 없을 경우 처리
  if (!blogData?.blogPosts) {
    return <div>No blog posts found</div>;
  }

  // 날짜별 포스트 수 계산
  const getPostsByDate = () => {
    const dates = blogData.blogPosts.reduce((acc, post) => {
      const date = new Date(post.metadata.date).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(dates)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const postsByDate = getPostsByDate();
  const maxPosts = Math.max(...postsByDate.map(d => d.count), 1);

  // 색상 계산 함수
  const getColor = (count: number): string => {
    if (count === 0) return '#ebedf0';
    const intensity = count / maxPosts;
    return `rgba(40, 134, 87, ${intensity})`;
  };

  return (
    <div className="blog-activity-heatmap">
      <div className="heatmap-wrapper">
        {postsByDate.map(({ date, count }) => (
          <div
            key={date}
            className="heatmap-cell"
            style={{
              backgroundColor: getColor(count),
            }}
            title={`${date}: ${count} posts`}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogActivityHeatmap;