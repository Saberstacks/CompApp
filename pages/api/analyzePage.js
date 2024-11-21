// Location: pages/api/analyzePage.js

import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required.' });
  }

  // Validate and format the URL
  let formattedUrl = url;
  if (!/^https?:\/\//i.test(url)) {
    formattedUrl = `http://${url}`;
  }

  try {
    // Fetch the HTML content
    const response = await axios.get(formattedUrl, { maxRedirects: 5 });
    const html = response.data;
    const $ = cheerio.load(html);

    // SSL Check
    const ssl = formattedUrl.startsWith('https://');

    // robots.txt Check
    const robotsTxtUrl = new URL('/robots.txt', formattedUrl).href;
    let robotsTxt = false;
    try {
      await axios.get(robotsTxtUrl);
      robotsTxt = true;
    } catch (err) {
      robotsTxt = false;
    }

    // Sitemap Check
    const sitemapUrl = new URL('/sitemap.xml', formattedUrl).href;
    let sitemap = false;
    try {
      await axios.get(sitemapUrl);
      sitemap = true;
    } catch (err) {
      sitemap = false;
    }

    // Meta Tags
    const title = $('title').text() || null;
    const metaDescription = $('meta[name="description"]').attr('content') || null;
    const canonical = $('link[rel="canonical"]').attr('href') || null;

    // Headings
    const headings = [];
    $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
      headings.push({
        tag: $(elem).get(0).tagName.toUpperCase(),
        text: $(elem).text().trim(),
      });
    });

    // Internal Links
    const internalLinks = new Set();
    const baseDomain = new URL(formattedUrl).origin;
    $('a[href]').each((i, elem) => {
      const link = $(elem).attr('href');
      if (link.startsWith('/') || link.startsWith(baseDomain)) {
        internalLinks.add(link);
      }
    });

    // Images and Alt Tags
    const images = $('img');
    let imagesWithAlt = 0;
    images.each((i, elem) => {
      if ($(elem).attr('alt')) {
        imagesWithAlt++;
      }
    });

    // Top Keywords
    const stopWords = [
      'and', 'the', 'of', 'in', 'to', 'a', 'is', 'for', 'on', 'that',
      'with', 'as', 'are', 'it', 'at', 'from', 'by', 'this', 'be', 'or', 'an',
      'your', 'you', 'we', 'our', 'us',
    ];
    const text = $('body').text().replace(/\s+/g, ' ').toLowerCase();
    const words = text.match(/\b[a-z]{3,}\b/g) || [];
    const wordCounts = {};
    words.forEach((word) => {
      if (!stopWords.includes(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
    const topKeywords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    res.status(200).json({
      ssl,
      robotsTxt,
      sitemap,
      title,
      metaDescription,
      canonical,
      headings,
      internalLinksCount: internalLinks.size,
      imagesWithAlt,
      totalImages: images.length,
      topKeywords,
    });
  } catch (error) {
    console.error('Analysis Error:', error.message);
    res.status(500).json({ message: `Error analyzing the URL: ${error.message}` });
  }
}
