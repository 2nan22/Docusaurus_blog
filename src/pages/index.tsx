import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BlogActivityHeatmap from '@site/src/components/BlogActivityHeatmap';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Portfolio
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            Tech Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

function BlogActivity() {
  return (
    <section className={styles.blogActivity}>
      <div className="container">
        <div className="row">
          <div className="col">
            <Heading as="h2" className={styles.activityTitle}>
              Blog Activity
            </Heading>
            <BlogActivityHeatmap />
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentPosts() {
  return (
    <section className={styles.recentPosts}>
      <div className="container">
        <div className="row">
          <div className="col">
            <Heading as="h2" className={styles.sectionTitle}>
              Recent Posts
            </Heading>
            {/* 최근 포스트 목록 컴포넌트 추가 예정 */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <BlogActivity />
        <RecentPosts />
      </main>
    </Layout>
  );
}