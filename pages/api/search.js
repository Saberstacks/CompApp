// Location: pages/api/search.js
 const data = response.data;
    console.log('API Response:', data); // Add this line for logging

    let message = '';

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
    let message = '';

    if (!data.local_results || data.local_results.length === 0) {
      message = 'Insufficient map pack results.';
    }

    const mapPackResults = data.local_results || [];
    const organicResults = data.organic_results ? data.organic_results.slice(0, 5) : [];

    res.status(200).json({ mapPackResults, organicResults, message });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'API limit reached or an error occurred.' });
  }
}
