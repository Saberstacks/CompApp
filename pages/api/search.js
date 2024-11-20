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
    const mapPackResults = (data.local_results || []).map((item) => {
      let business_type = '';
      let additional_info = [];

      if (Array.isArray(item.extensions)) {
        business_type = item.extensions[0];
        additional_info = item.extensions.slice(1);
      } else if (typeof item.extensions === 'string') {
        business_type = item.extensions;
        additional_info = [];
      } else {
        business_type = '';
        additional_info = [];
      }

      return {
        rank_in_map_pack: item.position,
        business_name: item.title,
        address: item.address,
        average_rating: item.rating,
        total_reviews: item.reviews,
        business_type,
        coordinates: item.coordinates || {},
        additional_info,
      };
    });

    // Organic Results
    const organicResults = (data.organic_results || [])
      .slice(0, 5)
      .map((item) => ({
        rank_in_organic: item.position,
        page_title: item.title,
        page_description: item.snippet,
        url: item.url,
        domain: item.displayed_url || new URL(item.url).hostname,
        cached_url: item.cached_page_url || '',
        related_pages_url: item.related_pages_url || '',
        rich_snippets: item.rich_snippet || {},
      }));

    // Miscellaneous
    const related_searches = data.related_searches || [];
    const ads_noted = data.ads ? true : false;
    const videos_noted = data.inline_videos ? true : false;

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
