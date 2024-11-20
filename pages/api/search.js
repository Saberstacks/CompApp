// Location: pages/api/search.js

import axios from 'axios';

export default async function handler(req, res) {
  const { keyword, location } = req.query;

  try {
    const response = await axios.get('https://api.serpstack.com/search', {
      params: {
        access_key: process.env.SERPSTACK_API_KEY,
        query: keyword,
        location: location,
        type: 'web',
      },
    });

    const data = response.data;

    if (data.error) {
      console.error('Serpstack API Error:', data.error);
      return res.status(500).json({ message: data.error.info });
    }

    // Map Pack Results (unchanged)
    const mapPackResults = (data.local_results || []).map((item) => {
      // ... existing code ...
    });

    // Organic Results
    const organicResults = (data.organic_results || [])
      .slice(0, 5)
      .map((item) => {
        let domain = 'N/A';
        if (typeof item.displayed_url === 'string') {
          domain = item.displayed_url;
        } else if (typeof item.url === 'string') {
          try {
            domain = new URL(item.url).hostname;
          } catch (error) {
            domain = 'N/A';
          }
        }

        // Ensure item.title is a string
        let pageTitle = 'N/A';
        if (typeof item.title === 'string') {
          pageTitle = item.title;
        } else if (item.title && typeof item.title === 'object') {
          pageTitle = JSON.stringify(item.title);
        }

        // Ensure item.snippet is a string
        let pageDescription = 'N/A';
        if (typeof item.snippet === 'string') {
          pageDescription = item.snippet;
        } else if (item.snippet && typeof item.snippet === 'object') {
          pageDescription = JSON.stringify(item.snippet);
        }

        return {
          rank_in_organic: item.position || 'N/A',
          page_title: pageTitle,
          page_description: pageDescription,
          url: typeof item.url === 'string' ? item.url : '',
          domain: domain,
          cached_url: typeof item.cached_page_url === 'string' ? item.cached_page_url : '',
          related_pages_url: typeof item.related_pages_url === 'string' ? item.related_pages_url : '',
          rich_snippets: item.rich_snippet || {},
        };
      });

    // Miscellaneous (unchanged)
    const related_searches = data.related_searches || [];
    const ads_noted = !!data.ads;
    const videos_noted = !!data.inline_videos;

    res.status(200).json({
      mapPackResults,
      organicResults,
      related_searches,
      ads_noted,
      videos_noted,
      message: '',
    });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res
      .status(500)
      .json({ message: 'API limit reached or an error occurred.' });
  }
}
