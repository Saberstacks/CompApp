// Location: components/Results.js

import { useRouter } from 'next/router';

export default function Results({ keyword, results }) {
  const router = useRouter();

  const handleAnalyze = (url) => {
    const encodedUrl = encodeURIComponent(url);
    router.push(`/analysisPage?url=${encodedUrl}`);
  };

  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>

      <h3>Map Pack Results</h3>
      {results.mapPackResults.length > 0 ? (
        results.mapPackResults.map((item, index) => (
          <div key={`map-${index}`} className="result-item">
            <h4>
              {item.rank_in_map_pack}. {item.business_name}
            </h4>
            <p>{item.address}</p>
            <button onClick={() => handleAnalyze(item.url)}>Competitor Page Analysis</button>
          </div>
        ))
      ) : (
        <p>No Map Pack Results found.</p>
      )}

      <h3>Organic Results</h3>
      {results.organicResults.length > 0 ? (
        results.organicResults.map((item, index) => (
          <div key={`organic-${index}`} className="result-item">
            <h4>
              {item.rank_in_organic}. {item.page_title}
            </h4>
            <p>{item.page_description}</p>
            <button onClick={() => handleAnalyze(item.url)}>Competitor Page Analysis</button>
          </div>
        ))
      ) : (
        <p>No Organic Results found.</p>
      )}
    </div>
  );
}
