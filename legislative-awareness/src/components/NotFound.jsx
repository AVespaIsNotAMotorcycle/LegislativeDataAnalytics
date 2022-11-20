import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <html id="center" lang="en">
      <img src="404NotFound.jpg" alt="even the pic was not found yo" />
      <div id="smolButton">
        <Link to="/" className="smolButton">
          Back to Home
        </Link>
      </div>
    </html>
  );
}

export default NotFound;
