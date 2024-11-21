// Location: pages/analysis.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AnalysisDisplay from '../components/AnalysisDisplay';

export default function AnalysisPage() {
  const router = useRouter();
  const { url } = router.query;

  const [competitorUrl, setCompetitorUrl] = useState('');
  const [competitorData, setCompetitorData] = useState(null);
  const [userUrl, setUserUrl] = useState('');
  const [userData, setUserData] = useState(null);
  const [loadingCompetitor, setLoadingCompetitor] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    if (url) {
      const decodedUrl = decodeURIComponent(url);
      setCompetitorUrl(decodedUrl);
      analyzeUrl(decodedUrl, setCompetitorData, setLoadingCompetitor);
    }
  }, [url]);

  const analyzeUrl = async (targetUrl, setData, setLoading) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/analyze', { url: targetUrl });
      setData(response.data);
    } catch (error) {
      console.error('Analysis Error:', error.response?.data || error.message);
      alert('An error occurred while analyzing the URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userUrl) {
      analyzeUrl(userUrl, setUserData, setLoadingUser);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        {loadingCompetitor ? (
          <p>Loading competitor analysis...</p>
        ) : competitorData ? (
          <AnalysisDisplay data={competitorData} title={`Analysis of ${competitorUrl}`} />
        ) : (
          <p>No competitor analysis data available.</p>
        )}
      </div>
      <div className="right-side">
        <h2>Analyze Your Own Website</h2>
        <form onSubmit={handleUserSubmit}>
          <label>
            Enter Your Business URL:
            <input
              type="url"
              value={userUrl}
              onChange={(e) => setUserUrl(e.target.value)}
              placeholder="https://www.yourwebsite.com"
              required
            />
          </label>
          <button type="submit">Analyze</button>
        </form>
        {loadingUser ? (
          <p>Loading your analysis...</p>
        ) : userData ? (
          <AnalysisDisplay data={userData} title={`Analysis of ${userUrl}`} />
        ) : null}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
        }
        .left-side,
        .right-side {
          flex: 1 1 50%;
          padding: 20px;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .left-side,
          .right-side {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
}
