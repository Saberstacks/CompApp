// Location: components/Results.js

import ResultRow from './ResultRow';

export default function Results({ keyword, results }) {
  return (
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
  );
}
