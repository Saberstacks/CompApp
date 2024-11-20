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

    // Map Pack Results
    const mapPackResults = Array.isArray(data.local_results)
      ? data.local_results.map((item) => {
          let business_type = 'N/A';
          let additional_info = [];

          // Safely handle item.extensions
          if (Array.isArray(item.extensions)) {
            business_type = item.extensions[0] || 'N/A';
            additional_info = item.extensions.slice(1);
          } else if (typeof item.extensions === 'string') {
            business_type = item.extensions || 'N/A';
          } else if (item.extensions && typeof item.extensions === 'object') {
            // Convert object values to array
            const extensionsArray = Object.values(item.extensions);
            business_type = extensionsArray[0] || 'N/A';
            additional_info = extensionsArray.slice(1);
          } else {
            // item.extensions is undefined or null
            business_type = 'N/A';
            additional_info = [];
          }

          return {
            rank_in_map_pack: item.position || 'N/A',
            business_name: item.title || 'N/A',
            address: item.address || 'N/A',
            average_rating: item.rating || 'N/A',
            total_reviews: item.reviews || 'N/A',
            business_type: business_type,
            coordinates: item.coordinates || {},
            additional_info: additional_info,
          };
        })
      : [];

    // Organic Results
    const organicResults = Array.isArray(data.organic_results)
      ? data.organic_results.slice(0, 5).map((item) => {
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
            cached_url:
              typeof item.cached_page_url === 'string' ? item.cached_page_url : '',
            related_pages_url:
              typeof item.related_pages_url === 'string' ? item.related_pages_url : '',
            rich_snippets: item.rich_snippet || {},
          };
        })
      : [];

    // Miscellaneous
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
    res.status(500).json({ message: 'API limit reached or an error occurred.' });
  }
}
