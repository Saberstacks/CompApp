// Location: components/ResultRow.js

import { useState } from 'react';

export default function ResultRow({ data, type }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (e) => {
    // Prevent click events from child elements (like links) from triggering the toggle
    if (e.target.tagName.toLowerCase() !== 'a') {
      setExpanded(!expanded);
    }
  };

  return (
    <div
      className={`result-row ${expanded ? 'expanded' : ''}`}
      onClick={handleToggle}
    >
      <div className="row-header">
        <span>
          {type === 'map' ? data.rank_in_map_pack : data.rank_in_organic}.{' '}
          {type === 'map' ? data.business_name : data.page_title}
        </span>
        <span className="arrow">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="row-details">
          {type === 'map' && (
            <>
              {/* Map Pack Details */}
              <p>
                <strong>Business Name:</strong> {data.business_name || 'N/A'}
              </p>
              {/* ... other map pack fields ... */}
            </>
          )}
          {type === 'organic' && (
            <>
              {/* Organic Results Details */}
              <p>
                <strong>Page Title:</strong> {data.page_title}
              </p>
              <p>
                <strong>Rank in Organic Results:</strong> {data.rank_in_organic || 'N/A'}
              </p>
              <p>
                <strong>Page Description:</strong> {data.page_description}
              </p>
              {data.url ? (
                <p>
                  <strong>URL:</strong>{' '}
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {data.url}
                  </a>
                </p>
              ) : (
                <p>
                  <strong>URL:</strong> N/A
                </p>
              )}
              {data.domain && data.domain !== 'N/A' ? (
                <p>
                  <strong>Domain:</strong> {data.domain}
                </p>
              ) : (
                <p>
                  <strong>Domain:</strong> N/A
                </p>
              )}
              {data.cached_url ? (
                <p>
                  <strong>Cached URL:</strong>{' '}
                  <a
                    href={data.cached_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {data.cached_url}
                  </a>
                </p>
              ) : (
                <p>
                  <strong>Cached URL:</strong> N/A
                </p>
              )}
              {data.related_pages_url ? (
                <p>
                  <strong>Related Pages URL:</strong>{' '}
                  <a
                    href={data.related_pages_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {data.related_pages_url}
                  </a>
                </p>
              ) : (
                <p>
                  <strong>Related Pages URL:</strong> N/A
                </p>
              )}
              {/* Rich Snippets Rendering (if desired) */}
            </>
          )}
        </div>
      )}
      <style jsx>{`
        /* ...existing styles... */
      `}</style>
    </div>
  );
}
