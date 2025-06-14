"use client"
import { useEffect } from 'react';

const NotFoundPage = () => {
  useEffect(() => {
    window.location.href = '/';
  }, []);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Redirecting to home...</p>
    </div>
  );
};

export default NotFoundPage;
