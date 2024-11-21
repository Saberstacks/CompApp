// Location: pages/index.js

import { useState } from 'react';
import axios from 'axios';
import ResultRow from '../components/ResultRow';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const response = await axios.get('/api/search', {
        params: {
          keyword,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Search Error:', error.response?.data || error.message);
      alert('An error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Competitor Analysis Tool</h1>
      <form onSubmit={handleSearch}>
        <label>
          Keyword (Include location in your query for regional results):
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., Window Cleaners in Cincinnati"
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {results && (
        <div>
          <h2>Search Results for "{keyword}"</h2>

          <h3>Map Pack Results</h3>
          {results.mapPackResults.length > 0 ? (
            results.mapPackResults.map((item, index) => (
              <ResultRow key={`map-${index}`} item={item} type="map" />
            ))
          ) : (
            <p>No Map Pack Results found.</p>
          )}

          <h3>Organic Results</h3>
          {results.organicResults.length > 0 ? (
            results.organicResults.map((item, index) => (
              <ResultRow key={`organic-${index}`} item={item} type="organic" />
            ))
          ) : (
            <p>No Organic Results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
