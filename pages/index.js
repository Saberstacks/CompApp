// Location: pages/index.js

import { useRouter } from 'next/router';
import { useState } from 'react';
import MessageBox from '../components/MessageBox';

export default function Home() {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to ensure no abbreviations are used
    if (city.length < 3 || state.length < 3) {
      setMessage('Please enter the full city and state names (no abbreviations).');
      return;
    }

    setMessage('');
    router.push(
      `/results?keyword=${encodeURIComponent(keyword)}&city=${encodeURIComponent(
        city
      )}&state=${encodeURIComponent(state)}`
    );
  };

  return (
    <div className="home-container">
      <h1>Search Engine Results Page Analyzer</h1>
      {message && <MessageBox type="error" message={message} />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="keyword">Keyword:</label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
            placeholder="Enter keyword"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City (full name):</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="Enter full city name (e.g., Miami)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State (full name):</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder="Enter full state name (e.g., Florida)"
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <style jsx>{`
        .home-container {
          padding: 20px;
        }
        h1 {
          text-align: center;
        }
        form {
          max-width: 500px;
          margin: 0 auto;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          display: block;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
