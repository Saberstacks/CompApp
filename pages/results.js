// Location: pages/results.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageBox from '../components/MessageBox';
import ResultRow from '../components/ResultRow';

export default function Results() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!router.isReady) return;

    const { keyword, location } = router.query;

    if (keyword && location) {
      setKeyword(keyword);
      setLocation(location);

      fetch(
        `/api/search?keyword=${encodeURIComponent(
          keyword
        )}&location=${encodeURIComponent(location)}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.message && !result.mapPackResults && !result.organicResults) {
            setMessage(result.message);
            setData({ mapPackResults: [], organicResults: [] });
          } else {
            setData(result);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Fetch Error:', error);
          setMessage('An error occurred while fetching data.');
          setLoading(false);
        });
    } else {
      setMessage('Keyword and location are required.');
      setLoading(false);
    }
  }, [router.isReady, router.query]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <style jsx>{`
          .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #4285F4;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="header">
        <div className="keyword-location">
          <h2>Keyword: {keyword}</h2>
          <h2>Location: {location}</h2>
        </div>
        {message && <MessageBox message={message} />}
      </div>

      {data?.ads_noted && <p>Ads Noted in Results</p>}
      {data?.videos_noted && <p>Videos Noted in Results</p>}

      <h3>Map Pack Results</h3>
      {data?.mapPackResults?.length > 0 ? (
        data.mapPackResults.map((item, index) => (
          <ResultRow key={index} data={item} type="map" />
        ))
      ) : (
        <p>No map pack results found.</p>
      )}

      <hr />

      <h3>Organic Results</h3>
      {data?.organicResults?.length > 0 ? (
        data.organicResults.map((item, index) => (
          <ResultRow key={index} data={item} type="organic" />
        ))
      ) : (
        <p>No organic results found.</p>
      )}

      {data?.related_searches?.length > 0 && (
        <>
          <hr />
          <h3>Related Searches</h3>
          <ul>
            {data.related_searches.map((search, index) => (
              <li key={index}>{search.query}</li>
            ))}
          </ul>
        </>
      )}

      <style jsx>{`
        .results-container {
          padding: 20px;
          font-family: 'Roboto', sans-serif;
        }
        .header {
          display: flex;
          justify-content: space-between;
        }
        .keyword-location h2 {
          margin: 0;
        }
        h3 {
          color: #4285F4;
        }
        hr {
          margin: 20px 0;
          border: none;
          border-top: 1px solid #ccc;
        }
        ul {
          list-style-type: disc;
          margin-left: 20px;
        }
      `}</style>
    </div>
  );
}
