import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Every Second Counts',
  tagline: '매 순간은 소중하기에',
  favicon: 'img/favicon-16x16.png',

  // Set the production url of your site here
  url: 'https://everysecondcounts.blog',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '2nan', // Usually your GitHub org/user name.
  projectName: '2nan', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/2nan22/Docusaurus_blog',  
          tagsBasePath: 'tags',
          // 메타데이터 관련 설정 추가
          // showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/2nan22/Docusaurus_blog',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Every Second Counts',
      logo: {
        alt: 'My Site Logo',
        src: 'img/everysecondcounts.png',
      },
      items: [
        {
          type: 'docSidebar',  // 이 부분이 중요합니다
          sidebarId: 'techblogSidebar',  // sidebars.ts에 정의한 사이드바 ID
          position: 'left',
          label: 'Contents',
        },
        {to: '/blog', label: 'I am', position: 'left'},
        {
          href: 'https://github.com/2nan22/Docusaurus_blog',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },      
      ],
    },
    metadata: [
      
    ],
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'ko'],
      localeConfigs: {
        en: {
          label: 'English',
          direction: 'ltr',
          htmlLang: 'en-US',
        },
        ko: {
          label: '한국어',
          direction: 'ltr',
          htmlLang: 'ko-KR',
        },
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/2nan22',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.` +
        `<br />Icons by <a href="https://www.flaticon.com/kr/free-icon/time-management_2348853?term=%EC%8B%9C%EA%B3%84&page=5&position=73&origin=search&related_id=2348853" target="_blank" rel="noopener noreferrer">juicy_fish - Flaticon</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
