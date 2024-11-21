// Location: components/AnalysisDisplay.js

export default function AnalysisDisplay({ data, title }) {
  return (
    <div className="analysis-results">
      <h2>{title}</h2>
      <h3>SEO Essentials Overview</h3>
      <ul>
        <li>SSL Certificate: {data.ssl ? 'Active ✅' : 'Inactive ❌'}</li>
        <li>robots.txt: {data.robotsTxt ? 'Present ✅' : 'Missing ❌'}</li>
        <li>Sitemap: {data.sitemap ? 'Found ✅' : 'Not Found ❌'}</li>
      </ul>

      <h3>Meta Tags and Content Structure</h3>
      <p><strong>Page Title:</strong> {data.title || 'N/A'}</p>
      <p><strong>Meta Description:</strong> {data.metaDescription || 'N/A'}</p>
      <p><strong>Canonical URL:</strong> {data.canonical || 'N/A'}</p>

      <h3>Content Hierarchy and Headings</h3>
      {data.headings && data.headings.length > 0 ? (
        <ul>
          {data.headings.map((heading, index) => (
            <li key={index}>
              {heading.tag}: {heading.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No headings found.</p>
      )}

      <h3>Internal Links & Local Link Opportunities</h3>
      <p>Internal Links Found: {data.internalLinksCount}</p>

      <h3>Image Optimization and Alt Tag Analysis</h3>
      <p>Images with Alt Tags: {data.imagesWithAlt}/{data.totalImages}</p>

      <h3>Top Keywords</h3>
      {data.topKeywords && data.topKeywords.length > 0 ? (
        <ul>
          {data.topKeywords.map((keyword, index) => (
            <li key={index}>
              {keyword.word}: {keyword.count}
            </li>
          ))}
        </ul>
      ) : (
        <p>No keywords found.</p>
      )}

      <style jsx>{`
        .analysis-results {
          margin-top: 20px;
        }
        h2 {
          margin-bottom: 10px;
        }
        h3 {
          margin-top: 20px;
        }
        ul {
          list-style-type: disc;
          padding-left: 20px;
        }
        li {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
}
