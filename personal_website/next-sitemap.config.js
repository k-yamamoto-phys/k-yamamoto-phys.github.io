/** @type {import('next-sitemap').IConfig} */
import { siteMetadata } from '../site_data/personal/_metadata.js'
const config = {
    siteUrl: siteMetadata.publicURL,
    generateRobotsTxt: true, // (optional)
    // ...other options
    autoLastmod: false,
    generateIndexSitemap: false,
    generateRobotsTxt: true,
};

export default config;