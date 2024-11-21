// Location: pages/index.js

import { useState } from 'react';
import axios from 'axios';
import Results from '../components/Results';

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
            placeholder="e.g., Plumbers in Miami"
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {results && <Results keyword={keyword} results={results} />}
    </div>
  );
}
