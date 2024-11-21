// Location: components/ResultRow.js

import { useRouter } from 'next/router';

export default function ResultRow({ item, type }) {
  const router = useRouter();

  const handleAnalyze = () => {
    const url = encodeURIComponent(item.url || item.website);
    router.push(`/analysis?url=${url}`);
  };

  return (
    <div className="result-row">
      <h4>
        {type === 'map' ? item.business_name : item.page_title} (Rank:{' '}
        {type === 'map' ? item.rank_in_map_pack : item.rank_in_organic})
      </h4>
      <p>{type === 'map' ? item.address : item.page_description}</p>
      <button onClick={handleAnalyze}>Competitor Page Analysis</button>
      <style jsx>{`
        .result-row {
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
        }
        h4 {
          margin: 0 0 5px 0;
        }
        p {
          margin: 0 0 10px 0;
        }
      `}</style>
    </div>
  );
}
