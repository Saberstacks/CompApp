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
              <p>
                <strong>Business Name:</strong> {data.business_name || 'N/A'}
              </p>
              <p>
                <strong>Rank in Map Pack:</strong> {data.rank_in_map_pack || 'N/A'}
              </p>
              <p>
                <strong>Address:</strong> {data.address || 'N/A'}
              </p>
              <p>
                <strong>Average Rating:</strong> {data.average_rating || 'N/A'}
              </p>
              <p>
                <strong>Total Reviews:</strong> {data.total_reviews || 'N/A'}
              </p>
              <p>
                <strong>Business Type:</strong> {data.business_type || 'N/A'}
              </p>
              {data.coordinates &&
                data.coordinates.latitude != null &&
                data.coordinates.longitude != null && (
                  <p>
                    <strong>Coordinates:</strong> Latitude {data.coordinates.latitude}, Longitude{' '}
                    {data.coordinates.longitude}
                  </p>
                )}
              {data.additional_info && data.additional_info.length > 0 && (
                <p>
                  <strong>Additional Info:</strong> {data.additional_info.join(', ')}
                </p>
              )}
            </>
          )}
          {type === 'organic' && (
            <>
              <p>
                <strong>Page Title:</strong> {data.page_title || 'N/A'}
              </p>
              <p>
                <strong>Rank in Organic Results:</strong> {data.rank_in_organic || 'N/A'}
              </p>
              <p>
                <strong>Page Description:</strong> {data.page_description || 'N/A'}
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
              {/* Temporarily remove the rendering of rich snippets to prevent errors */}
              {/* {data.rich_snippets &&
                typeof data.rich_snippets === 'object' &&
                Object.keys(data.rich_snippets).length > 0 ? (
                  <>
                    <p>
                      <strong>Rich Snippets Data:</strong>
                    </p>
                    <ul>
                      {Object.entries(data.rich_snippets).map(([key, value], index) => (
                        <li key={index}>
                          {key}: {JSON.stringify(value)}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>
                    <strong>Rich Snippets Data:</strong> N/A
                  </p>
                )} */}
            </>
          )}
        </div>
      )}
      <style jsx>{`
        .result-row {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .result-row:hover {
          background-color: #f9f9f9;
        }
        .row-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }
        .row-details {
          margin-top: 10px;
        }
        .arrow {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
