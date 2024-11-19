export default function MessageBox({ message }) {
  return (
    <div className="message-box">
      {message}
      <style jsx>{`
        .message-box {
          background-color: #ffcc00;
          padding: 10px;
          border-radius: 5px;
          color: #333;
        }
      `}</style>
    </div>
  );
}
