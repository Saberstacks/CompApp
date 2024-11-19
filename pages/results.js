// Location: pages/results.js

// ... (existing code)

useEffect(() => {
  if (keyword && location) {
    setLoading(true);
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
        setMessage('An error occurred while fetching data.');
        console.error('Fetch Error:', error);
        setLoading(false);
      });
  }
}, [keyword, location]);

// ... (rest of the code)





import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageBox from '../components/MessageBox';
import ResultRow from '../components/ResultRow';

export default function Results() {
  const router = useRouter();
  const { keyword, location } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (keyword && location) {
      setLoading(true);
      fetch(
        `/api/search?keyword=${encodeURIComponent(
          keyword
        )}&location=${encodeURIComponent(location)}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          setLoading(false);
          if (result.message) {
            setMessage(result.message);
          }
        })
        .catch(() => {
          setMessage('An error occurred while fetching data.');
          setLoading(false);
        });
    }
  }, [keyword, location]);

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
      `}</style>
    </div>
  );
}
