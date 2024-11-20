// Location: pages/results.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageBox from '../components/MessageBox';
import ResultRow from '../components/ResultRow';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Results() {
  const router = useRouter();
  const { keyword, location } = router.query;

  const [mapPackResults, setMapPackResults] = useState([]);
  const [organicResults, setOrganicResults] = useState([]);
  const [relatedSearches, setRelatedSearches] = useState([]);
  const [adsNoted, setAdsNoted] = useState(false);
  const [videosNoted, setVideosNoted] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword || !location) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/search?keyword=${encodeURIComponent(
            keyword
          )}&location=${encodeURIComponent(location)}`
        );
        const data = await res.json();

        if (res.ok) {
          setMapPackResults(data.mapPackResults);
          setOrganicResults(data.organicResults);
          setRelatedSearches(data.related_searches);
          setAdsNoted(data.ads_noted);
          setVideosNoted(data.videos_noted);
          setMessage(data.message);
        } else {
          setMessage(data.message || 'An error occurred.');
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        setMessage('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, location]);

  if (loading) {
    return (
      <div className="loading-container">
        <MessageBox type="info" message="Loading..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="results-container">
        {message && <MessageBox type="error" message={message} />}
        <h1>Search Results for "{keyword}" in "{location}"</h1>
        <h2>Map Pack Results</h2>
        {mapPackResults.map((result, index) => (
          <ResultRow key={index} data={result} type="map" />
        ))}
        <h2>Organic Results</h2>
        {organicResults.map((result, index) => (
          <ResultRow key={index} data={result} type="organic" />
        ))}
        <style jsx>{`
          .results-container {
            padding: 20px;
          }
          .loading-container {
            padding: 20px;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
}
