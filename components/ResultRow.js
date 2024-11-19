import { useState } from 'react';

export default function ResultRow({ data, type }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`result-row ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="row-header">
        <span>
          {data.position}. {data.name || data.title}
        </span>
        <span className="arrow">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="row-details">
          {type === 'map' && (
            <>
              <p>
                <strong>Address:</strong> {data.address}
              </p>
              <p>
                <strong>Ratings:</strong> {data.ratings}
              </p>
              <p>
                <strong>Reviews:</strong> {data.reviews}
              </p>
            </>
          )}
          {type === 'organic' && (
            <>
              <p>
                <strong>URL:</strong> {data.url}
              </p>
              <p>
                <strong>Snippet:</strong> {data.snippet}
              </p>
              <p>
                <strong>Title:</strong> {data.title}
              </p>
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
