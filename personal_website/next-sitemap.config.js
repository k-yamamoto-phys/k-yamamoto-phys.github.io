/** @type {import('next-sitemap').IConfig} */
import { siteMetadata } from '../site_data/personal/_metadata.js'

const groupPaths = [
    '',
    '/activities',
    '/contact',
    '/members',
    '/presentations',
    '/project',
    '/publications',
    '/research',
    '/ja',
    '/ja/activities',
    '/ja/contact',
    '/ja/members',
    '/ja/presentations',
    '/ja/project',
    '/ja/publications',
    '/ja/research',
];

const config = {
    siteUrl: siteMetadata.publicURL,
    generateRobotsTxt: true, // (optional)
    // ...other options
    autoLastmod: false,
    generateIndexSitemap: false,
    additionalPaths: async () => groupPaths.map((path) => ({
        loc: `/group${path}`,
        changefreq: 'daily',
        priority: 0.7,
    })),
};

export default config;
