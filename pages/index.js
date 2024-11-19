// Location: pages/index.js

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!keyword || !location) {
      setError('Please enter both keyword and location.');
      return;
    }
    router.push(
      `/results?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`
    );
  };

  return (
    <div className="container">
      <h1>Competitor Analysis</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="e.g., plumber near me"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="e.g., Miami, FL"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p className="error">{error}</p>}
      </div>
      <style jsx>{`
        .container {
          text-align: center;
          margin-top: 50px;
          font-family: 'Roboto', sans-serif;
        }
        .input-group {
          margin-top: 20px;
        }
        input {
          margin: 5px;
          padding: 10px;
          width: 200px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px 20px;
          background-color: #4285F4;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
